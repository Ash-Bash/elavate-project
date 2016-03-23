var WebApp = angular.module('WebApp', []);
WebApp.controller('WebAppController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from WebAppController");
    
    //Variables
    //Sets All Loaded iframes their assigned Views
    $scope.contentview_url = "iframes/home.html";
    $scope.playerview_url = "iframes/player.html";
    
    //Sets All Sidebar items to ether Active or not Active
    $scope.homeIsActive = "active";
    $scope.stationsIsActive = "";
    $scope.historyIsActive = "";
    $scope.favoritesIsActive = "";
    
    //Functions
    //Sets a Sidebar item as active and sets the iframes content
    $scope.setContentView = function(num) {
        if (num == 0){
            $scope.homeIsActive = "active";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "";
            
            $scope.contentview_url = "iframes/home.html";
        }
        else if (num == 1){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "active";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "";
            
            $scope.contentview_url = "iframes/stations.html";
        }
        else if (num == 2){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "active";
            $scope.favoritesIsActive = "";
            
            $scope.contentview_url = "iframes/history.html";
        }
        else if (num == 3){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "active";
            
            $scope.contentview_url = "iframes/favorites.html";
        }
    }
    
}]);