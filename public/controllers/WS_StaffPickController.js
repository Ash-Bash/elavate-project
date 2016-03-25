// Controller For WS_StaffPick.html
var StaffPick = angular.module('StaffPick', []);
StaffPick.controller('StaffPickController', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from StaffPickController");
    
    // HTTP Get Requests
    // Gets StationsList Database
    var refresh = function() {
        $http.get('/api/stationslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.stationlist = response;
        });
        
        $http.get('/api/staffpickslist').success(function(response) {
            console.log("I got My Data I Requested");
            $scope.staffpicklist = response;      
            
            $scope.pick = "";
        });
    };
    
    // Refresh WebPage
    refresh();

	$scope.stationData = function(id,name){      
	    pick.stationid = id;
		pick.stationname = name;
	}
    
    // Functions
    // Gets a Stations Info
    $scope.getStation = function(id) {
        $http.get('/api/stationslist/' + id).success(function(response){
            return response;
        });
    }   
     
    // Adds A Pick To The StaffPicks Database
    $scope.addPick = function() {
        console.log($scope.pick);
		
		var stationdata = JSON.parse(JSON.stringify(eval("(" + $scope.pick.stationdata + ")")));
        console.log(stationdata);
		var pickItem =  {
            name: $scope.pick.name,
            icon: $scope.pick.icon,
            stationid: stationdata.id,
            stationname: stationdata.sname
        };
		//pickItem.stationid = stationdata.id;
		//pickItem.stationname = stationdata.sname;

		console.log(pickItem);

        $http.post('/api/staffpickslist', pickItem).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    // Updates A Pick To The Database
    $scope.updatePick = function() {
        console.log($scope.pick._id);
		
		var stationdata = JSON.parse(JSON.stringify(eval("(" + $scope.pick.stationdata + ")")));
        console.log(stationdata);
		var pickItem =  {
            name: $scope.pick.name,
            icon: $scope.pick.icon,
            stationid: stationdata.id,
            stationname: stationdata.sname
        };
        
        $http.put('/api/staffpickslist/' + $scope.pick._id, pickItem).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
    // Edits A Pick From The Database
    $scope.editPick = function(id) {
        console.log(id);
        $http.get('/api/staffpickslist/' + id).success(function(response){
            $scope.pick = response;
            $scope.pick.stationdata = '{ "id": "' + response.stationid + '", "sname": "' + response.stationname + '" }';
        });
    }
    // Deletes A Pick From The StaffPicks Database
    $scope.deletePick = function(id) {
        console.log(id);
        $http.delete('/api/staffpickslist/' + id).success(function(response) {
            console.log(response);
            // Refresh WebPage
            refresh();
        });
    }
}]);

function searchObject(idKey, array){
    for (var i=0; i < array.length; i++) {
        if (array[i]._id === idKey) {
            return array[i];
        }
    }
}
