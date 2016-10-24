app.controller('jobInformationController', function($scope, $rootScope, $cookies, $location, Data,$routeParams) {

	$scope.jobid = $routeParams.jobid;
	$scope.jobsDetail = {};
	$scope.isJobApplied = false;
	$scope.appliedButtonText = "Submit Proposal";
	
	Data.get('jobs/getjobSerivcesData/'+ $scope.jobid,$rootScope.userTimeZone).then(function (result) {
    	console.log("getjobSerivcesData....",result);
    	if(result.status == 200){
    		$scope.jobsDetail = result.jobs;
    		
    		if(!$rootScope.isEmpty($scope.jobsDetail.jobApplications)){
    			if($scope.jobsDetail.jobApplications.length == 0){
    				
    			}else{
    				$.each($scope.jobsDetail.jobApplications,function(key,value){
        				if(value.appliedUserId == $rootScope.userinfo.user_id || $scope.jobsDetail.userId == $rootScope.userinfo.user_id){
        					$scope.isJobApplied = true;
        					$scope.appliedButtonText = "Proposal Submited";
        				}
        				
        			});
    				
    				
    			}
    			
    		}
    		
    		var lattitude = $scope.jobsDetail.userProfile.lattitude;
    		var longitude = $scope.jobsDetail.userProfile.longitude;
    		if(longitude != 0.0 && lattitude != 0.0){
    			var mapOptions = {
    			        zoom: 12,
    			        center: new google.maps.LatLng(lattitude,longitude),
    			        mapTypeId: google.maps.MapTypeId.HYBRID
    				};
    				$scope.map = new google.maps.Map(document.getElementById('locatinSharingmap'), mapOptions);
    				
    				$scope.marker = new google.maps.Marker({
    				      position: new google.maps.LatLng(lattitude,longitude),
    				      map: $scope.map,
    				      title:$scope.jobsDetail.userProfile.address,
    				  });
    				$scope.marker.setMap ($scope.map);
    				$scope.marker.setDraggable (false);
    		}
    		
    	}
    });
    
	
});