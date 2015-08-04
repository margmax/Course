var courseAppControllers = angular.module('courseAppControllers', ['ngRoute', 'angularFileUpload']);

courseAppControllers.controller('appController', ['$scope', '$sce', '$upload',
function($scope, $sce, $upload) {
    $scope.rectangles = [];
    $scope.ellipses = [];
    $scope.slides = [];
    $scope.videos = [];
    $scope.images = [];
    $scope.texts = [];
    $scope.boolShowVideoFrame = false;
    $scope.chooseVideo = function() {
      var s = prompt("Enter the link:", '');
      if (s !== '' && s !== null) 
        $scope.submitVideo(s.replace('https://youtu.be/', 'http://www.youtube.com/embed/'), true);
      return;
    }
    $scope.submitVideo = function(linkS, boolS) {
      alert(linkS);
      linkS = $sce.trustAsResourceUrl(linkS);
      $scope.videos.push({link: linkS, boolShow: boolS});
    }
    $scope.submitText=function(){
        $scope.texts.push('text');
    }
    $scope.submitSlide = function() {
        if ($scope.slides.length == 4) {
            return;
        }
        $scope.slides.push('slide');

    }
    $scope.submitRectangle = function(styleS, boolS) {
        $scope.rectangles.push({style: styleS, boolShow: boolS});
    }
    $scope.submitEllipse = function(styleS, boolS) {
        $scope.ellipses.push({style: styleS, boolShow: boolS});
    }
    $scope.$watch('files', function() {
      if (!$scope.files) return;
      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
          data: {upload_preset: $.cloudinary.config().upload_preset, tags: 'myphotoalbum'},
          file: file
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }).success(function (data, status, headers, config) {
          $scope.images.push(data);
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        });
      });
    });
}]);

