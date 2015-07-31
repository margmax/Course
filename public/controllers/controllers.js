var courseAppControllers = angular.module('courseAppControllers', ['ngRoute']);

courseAppControllers.controller('appController', ['$scope',
function($scope) {
    $scope.rectangles = [];
    $scope.ellipses = [];
    $scope.slides = [];
    $scope.submitSlide = function(styleS, boolS) {
       $scope.slides.push('slide');
   }
    $scope.submitRectangle = function(styleS, boolS) {
       $scope.rectangles.push({style: styleS, boolShow: boolS});
   }
   $scope.submitEllipse = function(styleS, boolS) {
       $scope.ellipses.push({style: styleS, boolShow: boolS});
   }
}]);

/*courseAppControllers.controller('MainCtrl', ['$scope' ,
	function($scope) {
		$scope.title = 1;
		$scope.content = 2;
    $scope.stuffs = [];
    $scope.submit = function() {
       $scope.stuffs.push({title: 'Hello', content: 'world'});
    }
}*/