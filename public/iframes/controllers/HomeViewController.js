var HomeView = angular.module('HomeView', []);
HomeView.controller('HomeViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from HomeViewController");
    
    $scope.station = {
        name: "No Station Selected",
        icon: "",
        websiteUrl: "No Station Selected",
        streamUrl: ""
        
    };
    
    // HTTP Get Requests
    // Gets StaffpickList Database
    var refresh = function() {
        $http.get('/api/staffpickslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.staffpicklist = response;      
            
            $scope.pick = "";
        });
    };
    
    // Refresh WebPage
    refresh();
    
    // Plays Radio Station function 
    $scope.playStation = function(id) {
        console.log(id);
        $http.get('/api/stationslist/' + id).success(function(response){
            station = response;
            console.log(station);
            $http.post('/api/historylist', station).success(function(resp) {
                console.log(resp);
                
            });
            
            $scope.station = station;
            var parentScope = $window.parent.angular.element("#WebAppDivController").scope();
            parentScope.station = $scope.station;
            parentScope.$apply(function () { });
            
        });
    }
    
    // Adds to Favorites function 
    $scope.addtoFavorites = function (id) {
        console.log(id);
        $http.get('/api/stationslist/' + id).success(function(response){
            station = response;
            console.log(station);
            $http.post('/api/favoriteslist', station).success(function(resp) {
                console.log(resp);
                
            });
        });
    }
    
}]);