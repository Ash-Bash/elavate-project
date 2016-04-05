var WebApp = angular.module('WebApp', []);
WebApp.controller('WebAppController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from WebAppController");
    
    // HTTP Get Requests
    // Gets StaffpickList Database
    var refresh = function() {
        $http.get('/api/staffpickslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.staffpicklist = response;      
            
            $scope.pick = "";
        });
        $http.get('/api/stationslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.stationlist = response;
        });
        $http.get('/api/historylist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.historylist = response;
            $scope.history = "";
        });
        $http.get('/api/favoriteslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.favoriteslist = response;
            $scope.favorites = "";
        });
    };
    
    // Refresh WebPage
    refresh();
    
    //Variables
    
    var homeView = document.getElementById("homeview");
    var stationView = document.getElementById("stationview");
    var historyView = document.getElementById("historyview");
    var favoritesView = document.getElementById("favoriteview");
    
    homeView.style.display = 'block';
    stationView.style.display = 'none';
    historyView.style.display = 'none';
    favoritesView.style.display = 'none';
    
    //Sets All Loaded iframes their assigned Views
    $scope.contentview_url = "iframes/home.html";
    $scope.playerview_url = "iframes/player.html";
    
    //Sets All Sidebar items to ether Active or not Active
    $scope.homeIsActive = "active";
    $scope.stationsIsActive = "";
    $scope.historyIsActive = "";
    $scope.favoritesIsActive = "";
    
    //Player States
    $scope.playState = false;
    $scope.favoriteState = false;
    //Player State Icons
    $scope.playIconState = "";
    $scope.favoriteIconState = "";
    
    //var childView = document.getElementById("contentview").contentWindow;
    //var childScope = childView.angular.element("#contentViewDiv").scope();
    
    $scope.station = {
        name: "No Station Selected",
        icon: "",
        websiteUrl: "No Station Selected",
        streamUrl: ""
        
    };
    
   
    
    //Player State Icon Logic
    if ($scope.playState == true){
        $scope.playIconState = "glyphicon glyphicon-pause";
    }
    else{
        $scope.playIconState = "glyphicon glyphicon-play";
    }    
    if ($scope.favoriteState == true){
        $scope.favoriteIconState = "glyphicon glyphicon-star";
    }
    else{
        $scope.favoriteIconState = "glyphicon glyphicon-star-empty";
    }
    
    //Functions
    $scope.getStation = function (stationItem) {
        $scope.station = stationItem;
    }
    
    //Sets a Sidebar item as active and sets the iframes content
    $scope.setContentView = function(num) {
        if (num == 0){
            $scope.homeIsActive = "active";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "";
            
            homeView.style.display = 'block';
            stationView.style.display = 'none';
            historyView.style.display = 'none';
            favoritesView.style.display = 'none';
        }
        else if (num == 1){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "active";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "";
            
            homeView.style.display = 'none';
            stationView.style.display = 'block';
            historyView.style.display = 'none';
            favoritesView.style.display = 'none';
        }
        else if (num == 2){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "active";
            $scope.favoritesIsActive = "";
            
            homeView.style.display = 'none';
            stationView.style.display = 'none';
            historyView.style.display = 'block';
            favoritesView.style.display = 'none';
        }
        else if (num == 3){
            $scope.homeIsActive = "";
            $scope.stationsIsActive = "";
            $scope.historyIsActive = "";
            $scope.favoritesIsActive = "active";
            
            homeView.style.display = 'none';
            stationView.style.display = 'none';
            historyView.style.display = 'none';
            favoritesView.style.display = 'block';
        }
    }
    
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
    
    // Plays Radio Station From History function 
    $scope.playStationFromHistory = function (id) {
        console.log(id);
        $http.get('/api/historylist/' + id).success(function(response){
            console.log(response);
            $scope.station = response;
        });
    }
    
    // Deletes a Item From History function 
    $scope.deleteStationFromHistory = function (id) {
        console.log(id);
        $http.delete('/api/historylist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    
    // Plays Radio Station From Favorites function 
    $scope.playStationFromFavorites = function (id) {
        console.log(id);
        $http.get('/api/favoriteslist/' + id).success(function(response){
            console.log(response);
            $http.post('/api/historylist', response).success(function(resp) {
                console.log(resp);
                
            });
            $scope.station = response;
        });
    }
    
    // Deletes a Item From Favorites function 
    $scope.deleteStationFromFavorites = function (id) {
        console.log(id);
        $http.delete('/api/favoriteslist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    
    //Player Functions
    $scope.play = function () {
         if ($scope.playState == true){
             $scope.playState = false;
             $scope.playIconState = "glyphicon glyphicon-pause";
         }
         else{
             $scope.playState = true;
             $scope.playIconState = "glyphicon glyphicon-play";
         }
    }
    
    $scope.addFavorites = function () {
        if ($scope.favoriteState == true){
             $scope.favoriteState = false;
             $scope.favoriteIconState = "glyphicon glyphicon-star";
         }
         else{
             $scope.favoriteState = true;
             $scope.favoriteIconState = "glyphicon glyphicon-star-empty";
         }
    }
    
}]);