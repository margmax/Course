var CourseApp = angular.module('CourseApp', [
  'ui.router',
  'courseAppControllers',
  'dnd'
  ]);

CourseApp.config(['$stateProvider', '$urlRouterProvider',
 function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/app");

  $stateProvider
  .state('app', {
    url: "/app",
    templateUrl: "templates/app.html",
    controller: "appController"
  });

}]);