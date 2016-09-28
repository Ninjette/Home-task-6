export {itemController}

function itemController($scope, dataService, $location){
	//rating
	$scope.rating = 0;
	var ratingDiv = document.querySelector('.rating');
	var currentRating = 0;
	var maxRating = 5;
	var callback = function(rating) { 
		$scope.rating = rating;
		console.log($scope.rating);
	};

	// rating instance
	var myRating = rating(ratingDiv, currentRating, maxRating, callback);


	let path = $location.path();
	let titleName = path.slice(6);

	$scope.getInfo = (title) =>{
		dataService.getItemJSON((response, title) =>{
			$scope.item = response.data;
		}, title);
	};
	$scope.getInfo(titleName);
	$scope.reviewId = 0;
	$scope.reviews = [];
	$scope.reviewMask = 'review_';
	
	$scope.showReviews = () => {
		$scope.lsLength = localStorage.length;
		if ($scope.lsLength > 0) {
			for(let i = 0; i < $scope.lsLength; i++) {
				let key = localStorage.key(i);
				if(key.indexOf($scope.reviewMask) == 0) {
					$scope.reviews.push(JSON.parse(localStorage.getItem(key)));
					let lsKey = localStorage.getItem(key);
				}
			}
		};
	}
	$scope.showReviews();

	$scope.addReview = (review) =>{
		//Local storage saving
		if (!$scope.hasSameId) {
			let objectLength = Object.keys($scope.reviews).length;
			if (objectLength > 0) {
				$scope.reviewId = objectLength;
			} else {
				$scope.reviewId = 0;
			};
			// movie.attrID = $scope.elemMask + $scope.elemId; what is it

			localStorage.setItem(
				$scope.reviewMask + $scope.reviewId, 
				JSON.stringify({text: review, rating : $scope.rating})
			);
		};
		$scope.reviews.push({
			text: review,
			rating : $scope.rating
		});
		$scope.reviewText = '';

		// localStorage.setItem($scope.reviewMask + $scope.reviewId, JSON.stringify({title: 'my title 228'}));
	}
}