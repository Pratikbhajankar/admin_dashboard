var dataofUserForApptNew = {};
app.controller('appointmentintractionController', function($scope,HttpCodes, $rootScope, $cookies, $location, Data,Notification,$routeParams) {
	
	/**
	 * getting the all the data 
	 */
	$scope.appointmentMode = $routeParams.appointmentMode;
	$scope.appointmentDate = $rootScope.getToday();
	console.log($routeParams.serviceId);
	$scope.serviceId = $routeParams.serviceId;
	$scope.userId = $rootScope.userinfo.user_id;
	$scope.appointmentSerrviceData = {};
	$scope.appotServIntractDataList = {};
	$scope.appointmentSlot = {};
	$scope.appointmentSlotString = {};
	$scope.isdataEditAllow = false;
	$scope.OtherAppointmentRunning = 0;
	$scope.dataofUserForApptOld = {};
	$scope.getAppoitnmentIntrData = function() {
		
		var appointmentDate = $scope.appointmentDate;
		Data.post('appointment/getAppoitmentDataIntraction/'+$scope.serviceId+"/"+$scope.userId, appointmentDate).then(function (result) {
			console.log(result);
			console.log($scope.appointmentDate);
			if(result.status == HttpCodes.OK){
				$scope.appointmentSerrviceData = result.appointmentSerrviceData;
				$scope.appotServIntractDataList = result.appotServIntractDataList;
				$scope.appointmentSlotString = result.appointmentSlotString;
				$.each($scope.appotServIntractDataList,function(key,value){
					$.each(value.appointmentdata.dataofUserForAppointment,function(keyInner,valueinner){
						if(valueinner.status == 1){
							$scope.OtherAppointmentRunning ++;
						}
						
					});	
					
					
					
				});
				
				$scope.appointmentSlot = result.appointmentSlot;
//				Notification.clearAll();
				
			}else if(result.status == HttpCodes.INTERNAL_SERVER_ERROR){
				
			}else if(result.status == HttpCodes.NO_CONTENT){
				$scope.appointmentSerrviceData = result.appointmentSerrviceData;
				$scope.appotServIntractDataList = result.appotServIntractDataList;
				$scope.appointmentSlot = result.appointmentSlot;
				Notification.info("No data available");
			}
			
		});
	};
	$scope.getAppoitnmentIntrData();
	
	$scope.changeStatus = function(dataofUserForAppt,status){
		
		
//		dataofUserForAppt.appointmentStatrd = !dataofUserForAppt.appointmentStatrd;
//		console.log("dataofUserForAppt....",dataofUserForAppt);
		
		if($scope.OtherAppointmentRunning <1 || status == 2  || status == 0){
			dataofUserForAppt["status"] = status;
			var appointmentUpdateBean = {
					"dataofUserForAppt":dataofUserForAppt,
					"serviceId":$scope.serviceId,
					"userId":$scope.userId
				};

				Data.post('appointment/updateAppointmentDataStatus', appointmentUpdateBean).then(function (result) {
					if(result.status == HttpCodes.OK){
						if(status == 2){
							Notification.success("Appointment updated");
							$scope.OtherAppointmentRunning--;
							
						}
						else if(status == 0){
							$scope.OtherAppointmentRunning--;
							Notification.info("Appointment status revert");
						}else if(status == 1){
							$scope.OtherAppointmentRunning++;
							Notification.primary("Appointment is Running");
						}
					}else if(result.result == HttpCodes.SC_NO_CONTENT){
						Notification.error(result.msg);
					}
				});

		}else{
			Notification.warning("please complete the running appointment");
		}
	};
	$scope.editAppointment = function(dataofUserForAppt){
		dataofUserForApptNew = {};
		dataofUserForApptOld = {};
		dataofUserForApptNew = angular.toJson(dataofUserForAppt);
		dataofUserForApptNew = JSON.parse(dataofUserForApptNew);
		$scope.dataofUserForApptOld = dataofUserForAppt;
		console.log("dataofUserForApptNew...",dataofUserForApptNew);
		console.log("dataofUserForAppt...",dataofUserForAppt);
		$scope.dataofUserForApptNew = {};
		$scope.dataofUserForApptNew = angular.toJson(dataofUserForApptNew);
		$scope.dataofUserForApptNew = JSON.parse($scope.dataofUserForApptNew);
		$scope.isdataEditAllow = false;
		$("#myModal").modal("show");
	};
	$scope.editCacelClick = function() {
		$scope.dataofUserForApptNew = {};
		$scope.dataofUserForApptNew = angular.toJson(dataofUserForApptNew);
		$scope.dataofUserForApptNew = JSON.parse($scope.dataofUserForApptNew);
	};
	$scope.updateAppointmentData = function(){
		$scope.dataofUserForApptOld;
		var appointmentUpdateBean = {
				"dataofUserForApptOld":$scope.dataofUserForApptOld,
				"dataofUserForApptNew":$scope.dataofUserForApptNew,
				"serviceId":$scope.serviceId,
				"userId":$scope.userId
			};
		Data.post('appointment/updateAppointmentData', appointmentUpdateBean).then(function (result) {
			console.log(result);
			if(result.status == HttpCodes.OK){
				Notification.success("Appointment Updated");
				$scope.getAppoitnmentIntrData();
				$("#myModal").modal("hide");
			}else{
				
			}
		});
	};
	$scope.deleteAppointment = function(){
		var appointmentUpdateBean = {
				"dataofUserForAppt":$scope.dataofUserForApptOld,
				"serviceId":$scope.serviceId,
				"userId":$scope.userId
			};
		Data.post('appointment/updateAppointmentDelete', appointmentUpdateBean).then(function (result) {
			console.log(result);
			if(result.status == HttpCodes.OK){
				Notification.success("Appointment Deleted");
				$scope.getAppoitnmentIntrData();
				$("#myModal").modal("hide");
			}else{
				Notification.error(result.msg);
				$("#myModal").modal("hide");
			}
		});
	}
});
app.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datetimepicker({timepicker:false,format:'d/m/Y',formatDate:'d/m/Y',scrollInput:false,
            	onSelectDate:function(dp,input){
//    			    console.log($input.val());
    			    
            		
            		
                    scope.$apply();
    			    
                    console.log(scope);
                   
                    
                    
    			  }
    	})
        }
    };
    
    
});