var courseAppControllers = angular.module('courseAppControllers', []);

courseAppControllers.controller('appController', ['$scope',
function($scope) {
	$scope.a = 12;
}]);