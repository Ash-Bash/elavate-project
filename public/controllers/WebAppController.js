var WebApp = angular.module('WebApp', []);
WebApp.controller('WebAppController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from WebAppController");
    
    //Sets All Loaded iframes their assigned Views
    $scope.contentview_url = "iframes/home.html";
    $scope.playerview_url = "iframes/player.html";
    
}]);