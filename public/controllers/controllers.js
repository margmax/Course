var courseAppControllers = angular.module('courseAppControllers', ['ngRoute']);

courseAppControllers.controller('appController', ['$scope',
function($scope) {
    $scope.stuffs = [];
    $scope.submit = function(styleS, boolS) {
       $scope.stuffs.push({style: styleS, boolShow: boolS});
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