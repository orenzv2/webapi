angular.module('F1FeederApp.controllers', []).

    /* Drivers controller */
  controller('driversController', function($scope, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };

    ergastAPIservice.getDrivers().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });
  }).
  
  /* login controller */
  controller('loginController', function($scope, $routeParams, ergastAPIservice) {
    console.log("in controller login");
    $scope.login = function (user, password) {
    	ergastAPIservice.login(user, password).success(function (response) {
        	console.log("in login success");
    	});
    }
  }). 

  /* login controller */
  controller('armController', function($scope, $routeParams, ergastAPIservice) {
    console.log("in controller arm");
    $scope.DISARMED = 'Disarmed';
    $scope.ARMED_AWAY = 'Armed away';
    $scope.ARMED_STAY = 'Armed stay';
    $scope.arm_status = '';
    $scope.pinCode = "";
    
    
    ergastAPIservice.getDrivers().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.arm_status = $scope.DISARMED;
    }).
    error(function(data, status, headers, config) {
        $scope.error_message = "Error " + status + ".Please try again.";
    });
    
    $scope.change_arm = function (request) {
        console.log("in change_arm function pincode is " + $scope.pinCode);		
    	$scope.arm_status = request;
	$scope.pinCode = "";
    }
  }). 


  /* Driver controller */
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });
  
