var CourseApp = angular.module('CourseApp', [
    'ui.router',
    'courseAppControllers',
    'dnd',
    'cloudinary',
    'colorpicker.module'
  ]);

CourseApp.factory("sizeContainer", function(){
    var variable;

    return {
        setValue: function(value) {
            variable = value;
        },
        getValue: function(){
            return variable;
        }
    }
});

CourseApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

CourseApp.directive("sort",function(){
    return{
        link: function(scope,element,attrs){
            $(element).sortable({
                axis: "x",
                containment: "parent"
            });
        }
    }
})

CourseApp.config(['$stateProvider', '$urlRouterProvider',
 function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/gallery");

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
         })
         .state('fullscreen', {
             url: "/fullscreen",
             templateUrl: "templates/fullscreen.html",
             controller: "appController"
         });

}]);