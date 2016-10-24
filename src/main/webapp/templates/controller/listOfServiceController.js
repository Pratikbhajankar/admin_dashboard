app.controller('listOfServiceController', function($scope, $rootScope, $cookies, $location, Data,Notification) {
	$scope.services = {};
	$scope.servicesList = [];
	var servicesObjectTosend = new  Array();
	
	
	Data.get("services/getAvailableServices/"+$rootScope.userinfo.user_id).then(function (results) {
		
		console.log("first Call Data ",results);
		
		if(results.status == 200){
			
			$scope.servicesList = results.servicesList;
			
			$scope.getSelectUserSevices();
			
		}
	});
	
	$scope.getSelectUserSevices = function(){
		var log = [];
		Data.get('user/getSelectUserSevices/'+$rootScope.userinfo.user_id).then(function (result) {
//			console.log(angular.toJson(result.selectedServices.mainObjectServiceHasMap));
			console.log(result);
			
			
			if(result.status == 200){
				$scope.serviceMap = result.selectedServices.serviceMap;
//				$scope.$watchCollection('serviceMap', function(newNames, oldNames) {
//					console.log("Upper lavel data changed");
//				});
//				$.each($scope.serviceMap,function(key,value){
//					$scope.$watch("value", function(newNames, oldNames) {
//						console.log("Upper lavel data changed");
//					});
//				});
				$.each($scope.servicesList,function(key,value){
					value.serviceMap = [];
						$.each(result.selectedServices.serviceMap,function(keyinner,valueinner){
							
							if(valueinner.serviceType == value.servicesId){
								value.serviceMap.push(valueinner);
							}
							
							
						});
						
						if(value.serviceMap.length == 0){
							var serviceMap = {
									"servieName":"",
									"servieDisplayName":"",
									"user_Id":$rootScope.userinfo.user_id,
								 };
							serviceMap.servieName = value.serviceSubName;
							serviceMap.serviceType = value.servicesId;
							value.serviceMap.push(serviceMap);
						}
				});
				
				$.each($scope.servicesList,function(mainKey,mainValue){
					mainValue["servieDisplayName"] = "";
				});
//				angular.forEach(result.selectedServices.mainObjectServiceHasMap, function(value, key) {
//					console.log("key value ...",key," main value",value["Id"])
//					$.each($scope.servicesList,function(mainKey,mainValue){
////						console.log("same Key",mainKey," main value",mainValue);
////						console.log("same Key",key," main value",value);
//						
//						if(mainValue.serviceSubName == key){
//							console.log("same Key");
//							console.log("same Key",mainValue.serviceSubName," main value",key);
//							console.log("same Key",mainValue," main value",value);
//							mainValue.seviceValue = true;
//							mainValue.servicesModoDbId = value["Id"];
//							mainValue["allredySelected"] = true;
//						}/*else{
//							mainValue["allredySelected"] = false;
//						}*/
//					});
//				}, log);
				
				console.log($scope.servicesList)
			}
		});
	};
	
	
	
	$scope.deleteThis = function(index,serviceMap){
//		service.serviceMap.splice(index,1);
		var dataToSend = {
			"serviceDto":serviceMap	
		};
		
		if ('idString' in serviceMap){
			
		}else{
			$scope.serviceMap.splice(index,1);
			return false;
		}
		
		Data.post('user/removeServices', dataToSend).then(function (result) {
			if(result.status == 200){
				
				$scope.getSelectUserSevices();
			}
		});
	};
	
	$scope.editServieDisplayName = function(service,tempThis) {
		console.log($($(tempThis.target).closest("li").find("input")).val());
		$($(tempThis.target).closest("li").find("input")).focus();
		service.editButtonShow = !service.editButtonShow;
	}
	$scope.doneEditServieDisplayName = function(service) {
		service.editButtonShow = !service.editButtonShow;
		
		Notification.info("Service Name is eddited Please save Data");
	}
	$scope.addMoreServices = function(service) {
		console.log(service.servieDisplayName);
		if(service.servieDisplayName == ""){
			Notification.warning("Please provoide name to service");
			return false;
		}
		var serviceMap = {
				"servieName":"",
				"servieDisplayName":service.servieDisplayName,
				"user_Id":$rootScope.userinfo.user_id,
			 };
		serviceMap.servieName = service.serviceSubName;
		serviceMap.serviceType = service.servicesId;
		$scope.serviceMap.push(serviceMap);
		Notification.info("Service is aaded please save data");
		service.servieDisplayName = "";
	};
	
	/**
	 * Save the all services data 
	 */
	$scope.saveService = function(flag){
		var i= 1;
		$.each($scope.serviceMap,function(key,value){
			console.log(key,"...........",value)
			
			value.serivceOrder = i;
//			var flag = false;
//			$.each(value.serviceMap,function(keyinner,valueinner){
//				
//				valueinner.serivceOrder = i;
//				flag = true;
//				i++;
//			});
//			
//			if(!flag){
				i++;
//			}
			
		});
		servicesObjectTosend = new  Array();
		var dataToSend = {};
		dataToSend["selectedServices"] = {};
		dataToSend.selectedServices["user_id"] = $rootScope.userinfo.user_id;
		dataToSend.selectedServices["serviceMap"] = [];
		dataToSend.selectedServices["serviceMap"] = $scope.serviceMap; 
//		if($scope.servicesList != null){
////			console.log($scope.services);
//			var log = [];
//			dataToSend.selectedServices["serviceMap"] = [];
//			angular.forEach($scope.servicesList, function(value, key) {
////			  console.log(key + ': ' + value);
//				value["userId"] = $rootScope.userinfo.user_id;
//			$.each(value.serviceMap,function(keyinner,valueinner){
////				if(valueinner.servieDisplayName != "" && keyinner !=0){
//					dataToSend.selectedServices["serviceMap"].push(valueinner);
////				}
//				
//			});
//			 
////			  if(value.seviceValue){
////				  if(!value.allredySelected){
////					  /* var serviceDto = {""};
////					  serviceDto["user_Id"] = $rootScope.userinfo.user_id;
////					  serviceDto["servieName"] = key;*/
////					  dataToSend.selectedServices["serviceMap"].push({"user_Id":$rootScope.userinfo.user_id,
////						  									"servieName":value.serviceSubName,
////						  									"serviceType":value.servicesId,
////						  									"serviceActive":value.seviceValue});
////				  }
////			  }else{
////				  if(value.allredySelected){
////					  value.servieToBeRemove = true;
////					  dataToSend.selectedServices["serviceMap"].push({"user_Id":$rootScope.userinfo.user_id,
////							"servieName":value.serviceSubName,
////							"serviceType":value.servicesId,
////							"serviceActive":value.seviceValue,
////							"servieToBeRemove":true,
////							"id":value.servicesModoDbId}); 
////				  }
////			  }
////			  
//			}, log);
//		
//		}else{
//			
//			console.log(servicesObjectTosend);
//		}
		
//		dataToSend.selectedServices["serviceMap"] = servicesObjectTosend;
		console.log(dataToSend);
//		dataToSend["servicesList"] = $scope.servicesList;
		
//		return false;
		Data.post('user/addSelectedService', dataToSend).then(function (result) {
			console.log(result);
			if(result.status == 200){
				Notification.success("Data saved succesfull");
//				$scope.servicesList.serviceMap = result.selectedServices.serviceMap;
//				$scope.servicesList = [];
//				$.each(result.servicesList,function(key,value){
//					
//					value.serviceMap = [];
//					$.each(result.selectedServices.serviceMap,function(keyinner,valueiner){
//						
//						if(valueiner.serviceType == value.servicesId){
//							value.serviceMap.push(valueiner);
//						}
//					})
//					$scope.servicesList.push(value);
//				});
				$scope.getSelectUserSevices();
				console.log($scope.servicesList);
				if(flag){
					$location.path("/serviceDashBoard");
				}
//				
			}else{
				
			}
		});
	};
	
	
	 $scope.$on('postionIsChange', function(event) {
			
		console.log("postionIsChange...............");
		var i = 1;
		$.each($scope.servicesList,function(key,value){
			console.log(key,"...........",value)
			value.displayOrder = i;
			var flag = false;
			$.each(value.serviceMap,function(keyinner,valueinner){
				
				valueinner.serivceOrder = i;
				flag = true;
				i++;
			});
			
			if(!flag){
				i++;
			}
			
		});
//			$scope.$apply();
	});
});