app.controller('IndexController', function($scope, $rootScope, $cookies, $location, Data) {

$scope.showNotificationInformation = function(notification){
	console.log(notification);
	if(notification.moduleName == "Jobs"){
		$location.path('/jobInformation/'+notification.moduleid);
	}else if(notification.moduleName == "JobsApllication"){
		$location.path('/jobInformation/'+notification.moduleid);
	}
};


});