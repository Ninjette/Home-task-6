export {mainController}

function mainController($scope, dataService){
	$scope.show = false;
	$scope.desired = {};
	$scope.propertyName = "Year";
	let inputData;

	$scope.changePage = (page) =>{
		dataService.getPageJSON((response, inputData) =>{
			$scope.movies = response.data.Search;
			$scope.renderReviewsAmount($scope.movies);
		}, inputData, page);
	};

	$scope.searchFunc = (input) =>{
		$scope.pages = [];
		inputData = input;
		dataService.getJSON((response, input) =>{
			$scope.movies = response.data.Search;

			let results = response.data.totalResults;
			if(results.length > 1){
				let pagesAmount = results.substring(0, results.length - 1);

				for (let i = 0; i <= pagesAmount; i++) {
					$scope.pages.push({num: i+1});
				};
			}
			$scope.renderReviewsAmount($scope.movies);
		}, input);
	};

	$scope.renderReviewsAmount = (items) =>{
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for (var j = 0; j < items.length; j++) {
				let itemID = items[j].imdbID;
				items[j].reviews = 0;
				for(let i = 0; i < $scope.lsLength; i++) {
					let key = localStorage.key(i);
					if(key.indexOf(itemID) > 0) {
						items[j].reviews += 1;
					}
				}
			};
		}
	}

	// Desired
	$scope.elemMask = 'elem_';
	$scope.desired = [];
	$scope.showDesired = () =>{
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for(let i = 0; i < $scope.lsLength; i++) {
				let key = localStorage.key(i);
				if(key.indexOf($scope.elemMask) == 0) {
					$scope.desired.push(JSON.parse(localStorage.getItem(key)));
					let lsKey = localStorage.getItem(key);
				}
			}
		};
		$scope.renderReviewsAmount($scope.desired);
	}
	$scope.showDesired();

	$scope.addToDesired = (movie) =>{

		$scope.hasSameId = false;

		for(let index in $scope.desired) { 
			if($scope.desired[index].imdbID == movie.imdbID){
				$scope.hasSameId = true;
			};
		};

		if (!$scope.hasSameId) {
			let objectLength = Object.keys($scope.desired).length;
			if (objectLength > 0) {
				$scope.elemId = objectLength;
			} else {
				$scope.elemId = 0;
			};
			movie.attrID = $scope.elemMask + $scope.elemId;
			$scope.desired.push(movie);

			localStorage.setItem($scope.elemMask + $scope.elemId, JSON.stringify(movie));
		};
	}
}