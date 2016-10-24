app.controller('jobApplicationController', function($scope, $rootScope, $cookies, $location, Data,$routeParams,Notification) {
	$scope.jobid = $routeParams.jobid;
	$scope.message = "";
	Data.get('jobs/getjobSerivcesData/'+ $scope.jobid,$rootScope.userTimeZone).then(function (result) {
    	console.log("getjobSerivcesData....",result);
    	if(result.status == 200){
    		$scope.jobsDetail = result.jobs;
    		
    	}
	});
	
	$scope.applyJob = function() {
		var dataToSend = {
				"jobId":$scope.jobid,
				"message":$scope.message,
				"userId":$scope.jobsDetail.userProfile.userMaster.user_id,
				"appliedUserId":$rootScope.userinfo.user_id
		};
		
		Data.post('jobApplication/apllyJob', dataToSend).then(function (result) {
	    	console.log("getjobSerivcesData....",result);
	    	if(result.status == 200){
	    		Notification.success("Job Applied Successfully");
	    		$location.path("/jobInformation/"+$scope.jobid)
	    	}else if(result.status == 420){
	    		Notification.error("Unable To Applied For Job");
	    	}else if(result.status == 500){
	    		Notification.error("Oops Internal Server Error Please try again latter");
	    	}else if(result.status == 409){
	    		Notification.error("You have already applied for this job");
	    	}
		});
		
	}
});