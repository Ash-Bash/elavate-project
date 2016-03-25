var StationsView = angular.module('StationsView', []);
StationsView.controller('StationsViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from StationsViewController");
    
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
}]);