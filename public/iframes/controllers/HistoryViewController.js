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
}]);