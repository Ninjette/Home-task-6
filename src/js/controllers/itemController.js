export {itemController}

function itemController($scope, dataService, $location){
	//rating
	$scope.rating = 0;

	// target element
	var ratingDiv = document.querySelector('.rating');

	// current rating, or initial rating
	var currentRating = 0;

	// max rating, i.e. number of stars you want
	var maxRating = 5;

	// callback to run after setting the rating
	var callback = function(rating) { 
		$scope.rating = rating;
		console.log($scope.rating);
	};

	// rating instance
	var myRating = rating(ratingDiv, currentRating, maxRating, callback);


	let path = $location.path();
	let titleName = path.slice(6);

	$scope.getInfo = function(title){
		dataService.getItemJSON((response, title) =>{
			$scope.item = response.data;
		}, title);
	};
	$scope.getInfo(titleName);
	$scope.reviews = [];
	$scope.addReview = function(review){
		$scope.reviews.push({
			text: review,
			rating : $scope.rating
		});
		$scope.reviewText = '';
	}


}