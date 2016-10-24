app.controller('seatPlanServiceReportController', function($scope, $rootScope, $cookies, $location, Data,Notification,$log,$routeParams) {
	$scope.floorPlanDataDate = $rootScope.getToday();
	$scope.serviceId = $routeParams.serviceId;
	$scope.userId = $rootScope.userinfo.user_id;
	$scope.sessionId = $routeParams.sessionId;
	$scope.seaTPlanDataList = {};
	
	/**
	 * Getting the service data For Day
	 */
	$scope.getSeatPlanRepotData = function() {
		var dataTosend = {
				"userId":$scope.userId,
				"serviceId":$scope.serviceId,
				"sessionId":$scope.sessionId,
				"dateString":$scope.floorPlanDataDate
		};
		
		Data.post('v2/florrPlanData/getReportOFSeatFllorPlan', dataTosend).then(function (result) {
			console.log(result);
			if(result.status == 200){
				$scope.seaTPlanDataList = result.seaTPlanData;
			}else if(result.status == 204){
				$scope.seaTPlanDataList = result.seaTPlanData;
			}else{
				
			}
			
		});
	};
	$scope.getSeatPlanRepotData();
});
app.directive('jqdatepicker1', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datetimepicker({timepicker:false,format:'d/m/Y',formatDate:'d/m/Y',scrollInput:false,
            	onSelectDate:function(dp,input){
//    			    console.log($input.val());
    			    
            		
            		
                    scope.$apply();
    			    
//                    console.log(scope);
                   
                    
                    
    			  }
    	})
        }
    };
    
    
});