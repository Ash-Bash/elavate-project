// Controller For WebService.html
var FavoritesView = angular.module('FavoritesView', []);
FavoritesView.controller('FavoritesViewController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from FavoritesViewController");
    
    // HTTP Get Requests
    // Gets FavoritesList Database
    var refresh = function() {
        $http.get('/api/favoriteslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.favoriteslist = response;
            $scope.favorites = "";
        });
    };
    
    // Refresh WebPage
    refresh();
    
    // Plays Radio Station function 
    $scope.playStation = function (id) {
        console.log(id);
        $http.get('/api/favoriteslist/' + id).success(function(response){
            console.log(response);
            $http.post('/api/historylist', response).success(function(resp) {
                console.log(resp);
                
            });
        });
    }
    
    // Deletes a Item From Favorites function 
    $scope.deleteStation = function (id) {
        console.log(id);
        $http.delete('/api/favoriteslist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
}]);