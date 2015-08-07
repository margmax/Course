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

//CourseApp.directive("color",function(){
//    return{
//        link: function(scope,element,attrs){
//            $(element).css('background-color','#dddddd');
//        }
//    }
//})

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