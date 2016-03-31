var HistoryView = angular.module('HistoryView', []);
HistoryView.controller('HistoryViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from HistoryViewController");
    
    // HTTP Get Requests
    // Gets HistoryList Database
    var refresh = function() {
        $http.get('/api/historylist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.historylist = response;
            $scope.history = "";
        });
    };
    
    // Refresh WebPage
    refresh();
    
    // Plays Radio Station function 
    $scope.playStation = function (id) {
        console.log(id);
        $http.get('/api/historylist/' + id).success(function(response){
            console.log(response);
        });
    }
    
    // Deletes a Item From History function 
    $scope.deleteStation = function (id) {
        console.log(id);
        $http.delete('/api/historylist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
}]);