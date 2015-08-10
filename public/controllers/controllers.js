var courseAppControllers = angular.module('courseAppControllers', ['ngRoute', 'angularFileUpload','colorpicker.module','FBAngular']);

courseAppControllers.controller('appController', ['$scope', '$sce', '$upload', '$http', '$location', 'service', 'Fullscreen',
function($scope, $sce, $upload, $http, $location, service,Fullscreen) {
    $scope.slide = {
      rectangles: [],
      ellipses: [],
      videos: [],
      images: [],
      texts: []
    };
    $scope.size=16;
    $scope.slides = service.slides;
    $scope.presentations = service.presentations;
    $scope.slideIndex = 0;
    $scope.showSlideIndex = 0;
    $scope.presentationName = service.presentationName;
    $scope.tags = [];

    $scope.submitPresentation = function() {
      if ($scope.presentations === null) {
        service.presentationName = $scope.presentationName;
        $location.path('/app');
        return;
      }
      if ($scope.presentations[$scope.presentationName] === undefined) {
        service.presentationName = $scope.presentationName;
        $location.path('/app');
        return;
      }
      alert("This name is busy.")
    }

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

    $scope.changeShowSlideIndex = function(direction) {
      if (direction) {
        $scope.showSlideIndex++;
        return;
      }
      $scope.showSlideIndex--;
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
        $scope.submitVideo(s.replace('https://youtu.be/', 'http://www.youtube.com/embed/'));
      return;
    }

    $scope.showMenuVid=function(){
        console.log("yea");
        display = document.getElementById("menuVid").style.display;
        if(display=='none'){
            document.getElementById("menuVid").style.display='block';
        }else{
            document.getElementById("menuVid").style.display='none';
        }
    }

    $scope.showMenuTex=function(){
        console.log("yea");
        display = document.getElementById("menuTex").style.display;
        if(display=='none'){
            document.getElementById("menuTex").style.display='block';
        }else{
            document.getElementById("menuTex").style.display='none';
        }
    }

    $scope.showMenuImg=function(){
        console.log("yea");
        display = document.getElementById("menuImg").style.display;
        if(display=='none'){
            document.getElementById("menuImg").style.display='block';
        }else{
            document.getElementById("menuImg").style.display='none';
        }
    }

    $scope.showMenuRec=function(){
        console.log("yea");
        display = document.getElementById("menuRec").style.display;
        if(display=='none'){
            document.getElementById("menuRec").style.display='block';
        }else{
            document.getElementById("menuRec").style.display='none';
        }
    }

    $scope.showMenuEll=function(){
        console.log("yea");
        display = document.getElementById("menuEll").style.display;
        if(display=='none'){
            document.getElementById("menuEll").style.display='block';
        }else{
            document.getElementById("menuEll").style.display='none';
        }
    }

    $scope.submitVideo = function(linkS) {
      var linkU = $sce.trustAsResourceUrl(linkS);
      $scope.slides[$scope.slideIndex].videos.push({link: linkU, linkS: linkS, style: ""});
    }
    $scope.submitText=function(){
        $scope.slides[$scope.slideIndex].texts.push({style: ""});
    }
    $scope.submitSlide = function() {
        $scope.slides.push(angular.copy($scope.slide));
    }

    $scope.submitRectangle = function(styleS) {
        $scope.slides[$scope.slideIndex].rectangles.push({style: styleS});
    }
    $scope.submitEllipse = function(styleS) {
        $scope.slides[$scope.slideIndex].ellipses.push({style: styleS});
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

    $scope.showPresentation = function() {
      $location.path('/fullscreen');
    }

    $scope.deletePresentation = function() {
      delete $scope.presentations[$scope.presentationName];
      $http.post('/userData', $scope.presentations);
      $location.path('/gallery');
    }

    $scope.savePresentation = function() {
      $scope.setSlideIndex($scope.slideIndex);
      service.presentations[$scope.presentationName] = $scope.slides;
      $http.post('/userData', service.presentations);
      alert("Saved.");
    }
    $scope.loadPresentation = function(name) {
      service.slides = $scope.presentations[name];
      for (var j = 0; j < service.slides.length; j++)
        if (service.slides[j].videos !== undefined)
          for (var i = 0; i < service.slides[j].videos.length; i++) {
            service.slides[j].videos[i].link = $sce.trustAsResourceUrl(service.slides[j].videos[i].linkS);
          }
      service.presentationName = name;
      $location.path('/app');
    }

    $http.get('/userData').success(function(res) {
      if (JSON.parse(res.data) === null) return;
      service.presentations = JSON.parse(res.data);
    });

    $scope.goFullscreen = function () {
        alert('sdefghn');
        if (Fullscreen.isEnabled())
            Fullscreen.cancel();
        else
            Fullscreen.all();
    }
}]);




courseAppControllers.service("service", function Service() {
  var service = this;
  service.presentationName = null;
  service.slides = [];
  service.presentations = {};
})






