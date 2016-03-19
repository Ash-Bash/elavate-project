// Controller For WS_Stations.html
var StationsList = angular.module('StationsList', []);
StationsList.controller('StationsListController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from StationsListController");
    
    
    // HTTP Get Requests
    // Gets StationsList Database
    var refresh = function() {
        $http.get('/api/stationslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.stationlist = response;
            $scope.station = "";
        });
    };
    
    // Refresh WebPage
    refresh();
    
    // Functions
    // Adds A Station To The Station Database
    $scope.addStation = function() {
        console.log($scope.station);
        $http.post('/api/stationslist', $scope.station).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    // Updates A Station To The Database
    $scope.updateStation = function() {
        console.log($scope.station._id);
        $http.put('/api/stationslist/' + $scope.station._id, $scope.station).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    // Edits A Station From The Database
    $scope.editStation = function(id) {
        console.log(id);
        $http.get('/api/stationslist/' + id).success(function(response){
            $scope.station = response;
        });
    }
    // Deletes A Station From The Station Database
    $scope.deleteStation = function(id) {
        console.log(id);
        $http.delete('/api/stationslist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
}]);