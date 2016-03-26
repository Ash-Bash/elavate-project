// Controller For WebService.html
var FavoritesView = angular.module('FavoritesView', []);
FavoritesView.controller('FavoritesViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from FavoritesViewController");
    
    // HTTP Get Requests
    // Gets FavoritesList Database
    var refresh = function() {
        $http.get('/api/favoriteslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.historylist = response;
            $scope.history = "";
        });
    };
    
    // Refresh WebPage
    refresh();
}]);