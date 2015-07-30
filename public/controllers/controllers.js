var courseAppControllers = angular.module('courseAppControllers', ['ngRoute']);

courseAppControllers.controller('appController', ['$scope',
function($scope) {
    $scope.stuffs = [];
    $scope.submit = function(c, d) {
       $scope.stuffs.push({a: c, b: d});
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