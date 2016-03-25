var HomeView = angular.module('HomeView', []);
HomeView.controller('HomeViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from HomeViewController");
    
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
}]);