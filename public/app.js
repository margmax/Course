var CourseApp = angular.module('CourseApp', [
  'ui.router',
  'courseAppControllers',
  'dnd',
  'cloudinary'
  ]);

CourseApp.config(['$stateProvider', '$urlRouterProvider',
 function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/cloud");

  $stateProvider
         .state('app', {
             url: "/app",
             templateUrl: "templates/app.html",
             controller: "appController"
         })
         .state('cloud', {
             url: "/cloud",
             templateUrl: "templates/cloud.html",
             controller: "appController"
         })
         .state('gallery', {
             url: "/gallery",
             templateUrl: "templates/gallery.html",
             controller: "appController"
         });

}]);