
app.controller('SelectServiceDhBrdController', function($scope, $rootScope, $cookies, $location, Data,Notification,$log) {
	$log.log("test message");
	var dataToSend = {"selectedServices":{"user_id":$rootScope.userinfo.user_id}};
	
	var servicesAvailable = [];
	/**
	 * getting the all the data 
	 */
	
	console.log("$rootScope.timezone..."+$rootScope.timezone);
	
	var timeZonedata = {};
	timeZonedata["timeZone"] = $rootScope.timezone;
	timeZonedata["userTimeZone"] = $rootScope.userTimeZone;
	
	 var headers = {"headers":timeZonedata};
	Data.getWithHeader('user/getSelectUserSevicesForWeb/'+$rootScope.userinfo.user_id,headers).then(function (result) {
//		console.log(angular.toJson(result.selectedServices.mainObjectServiceHasMap));
		console.log("getting data result",result);
		if(result.status == 200){
			$scope.servicesData = result.selectedServices.serviceMap;
				if(!$rootScope.isEmpty($scope.servicesData)){
					$location.path('/servicesSettingDashBoard/'+$scope.servicesData[0].idString+"/"+$scope.servicesData[0].serviceType);
				}
		}else{
			
		}
	});
	
	
	
});



