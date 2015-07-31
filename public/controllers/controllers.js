var courseAppControllers = angular.module('courseAppControllers', ['ngRoute']);

courseAppControllers.controller('appController', ['$scope',
function($scope) {
    $scope.rectangles = [];
    $scope.ellipses = [];
    $scope.slides = [];
    $scope.videos = [];
    $scope.boolShowVideoFrame = false;
    $scope.chooseVideo = function() {
    	var s = prompt("Enter the link:", '');
    	if (s !== '' && s !== null) 
    		$scope.submitVideo(s.replace('https://youtu.be/', 'http://www.youtube.com/embed/'), true);
    	return;
    }
    $scope.submitVideo = function(linkS, boolS) {
    	alert(linkS);
    	$scope.videos.push({link: linkS, boolShow: boolS});
    }
    $scope.submitSlide = function(styleS, boolS) {
       	$scope.slides.push('slide');
   	}
    $scope.submitRectangle = function(styleS, boolS) {
    	alert(styleS);
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