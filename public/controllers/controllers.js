var courseAppControllers = angular.module('courseAppControllers', ['ngRoute', 'angularFileUpload','colorpicker.module']);

courseAppControllers.controller('appController', ['$scope', '$sce', '$upload',
function($scope, $sce, $upload) {
    $scope.slide = {
      rectangles: [],
      ellipses: [],
      videos: [],
      images: [],
      texts: []
    };
    $scope.size=16;
    $scope.slides = [];
    $scope.slideIndex = 0;
    $scope.setSlideIndex = function(index) {
      $('.rectangle').each(function(index, element){
        $scope.slides[$scope.slideIndex].rectangles[index].style = $(element).attr('style');
      });
      $('.ellipse').each(function(index, element){
        $scope.slides[$scope.slideIndex].ellipses[index].style = $(element).attr('style');
      });
      $('.video').each(function(index, element){
        $scope.slides[$scope.slideIndex].videos[index].style = $(element).attr('style');
      });
      $('.text').each(function(index, element){
        $scope.slides[$scope.slideIndex].texts[index].style = $(element).attr('style');
      });
      $('.image').each(function(index, element){
        $scope.slides[$scope.slideIndex].images[index].style = $(element).attr('style');
      });

      $scope.slideIndex = index;
    }

    $scope.submitSize=function(){
        s=$scope.size;
        if(s==16){
            m=1.7;
        }
        if(s==4) {
            m=1.34;
        }
        var elem = document.getElementById("slide");
        var theCSSprop = window.getComputedStyle(elem,null).getPropertyValue("height");
        var h=parseInt(theCSSprop)*m;
        document.getElementById('slide').style.width = h +'px';
    }

    $scope.chooseVideo = function() {
      var s = prompt("Enter the link:", '');
      if (s !== '' && s !== null) 
        $scope.submitVideo(s.replace('https://youtu.be/', 'http://www.youtube.com/embed/'), true);
      return;
    }

    $scope.submitVideo = function(linkS, boolS) {
      alert(linkS);
      linkS = $sce.trustAsResourceUrl(linkS);
      $scope.slides[$scope.slideIndex].videos.push({link: linkS, boolShow: boolS, style: ""});
    }
    $scope.submitText=function(){
        $scope.slides[$scope.slideIndex].texts.push({style: ""});
    }
    $scope.submitSlide = function() {
        $scope.slides.push(angular.copy($scope.slide));
    }

    $scope.submitRectangle = function(styleS, boolS) {
        $scope.slides[$scope.slideIndex].rectangles.push({style: styleS, boolShow: boolS});
        console.log($scope.color);
    }
    $scope.submitEllipse = function(styleS, boolS) {
        $scope.slides[$scope.slideIndex].ellipses.push({style: styleS, boolShow: boolS});
    }
    $scope.$watch('files', function() {
      if (!$scope.files) return;
      $scope.files.forEach(function(file){
        $scope.upload = $upload.upload({
          url: "https://api.cloudinary.com/v1_1/" + 'alksnk-max' + "/upload",
          data: {upload_preset: 'rdlkivg2', tags: 'myphotoalbum'},
          file: file
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }).success(function (data, status, headers, config) {
          $scope.slides[$scope.slideIndex].images.push(data);
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        });
      });
    });
}]);

