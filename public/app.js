var CourseApp = angular.module('CourseApp', [
  'ui.router',
  'courseAppControllers',
  'dnd',
  'cloudinary'
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
})

CourseApp.directive("cloud", function(){
    return {
        scope: {
            a: "="
        },
        link: function(scope, element, attrs){
            var word_list = [];
            var words=['dfg','ertghy','wertghyj','dfdgh','erf'];
            for(var i=0;i<words.length;i++){
                var tag={};
                tag.text=words[i];
                tag.weight=5+0.5*i;
                word_list.push(tag);
            }
            $(function () {
                $(element).jQCloud(word_list);
            });
        }
    }
})

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