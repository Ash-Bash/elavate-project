var StationsView = angular.module('StationsView', []);
StationsView.controller('StationsViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from StationsViewController");
    
    $scope.station = {
        name: "No Station Selected",
        icon: "",
        websiteUrl: "No Station Selected",
        streamUrl: ""
        
    };
    
    // HTTP Get Requests
    // Gets StationsList Database
    var refresh = function() {
        $http.get('/api/stationslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.stationlist = response;
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