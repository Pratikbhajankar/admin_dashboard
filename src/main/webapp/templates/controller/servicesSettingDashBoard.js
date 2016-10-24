
	

var appScope = "";
var appointmentoldDataformData = {}; 
/*var dummyScopInputFildVal = {"columnOne":{"featurOrSerivceName":"","placeholder":"Enter Serive Name"},
							 "columntwo":{"featurOrSerivceNamePrice":"","placeholder":"Enter Service Price"},
							 "columnThree":{"featurOrSerivceNameShowPrice":true}

							};*/
app.controller('servicesSettingDashBoardController', 
		function($scope,HttpCodes, $rootScope,$uibModal,$cookies, $location, Data,Notification,$routeParams,$log) {

	var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase() +
	"a1b1c1d1e1f1g1h1i1j1k1l1m1n1o1p1q1r1s1t1u1v1w1x1y1z1".toUpperCase() +
	"a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2q2r2s2t2u2v2w2x2y2z2".toUpperCase().split("");
	 $scope.tinymceOptions = {
			    inline: false,
			    height: 450,
			    plugins : [
			               'advlist autolink lists link image charmap print preview hr anchor pagebreak',
			               'searchreplace wordcount visualblocks visualchars code fullscreen',
			               'insertdatetime media nonbreaking save table contextmenu directionality',
			               'emoticons template paste textcolor colorpicker textpattern imagetools'
			             ],
			    skin: 'lightgray',
			    theme : 'modern'
			  };
    
	 
	 
	 
	
//	Notification.success('');
	$scope.serviceId = $routeParams.serviceId;
	$scope.serviceType = $routeParams.serviceType;
	$scope.tabToOpen = $routeParams.tabToOpen;
	
	
	
	$scope.hasAppointmentSerivces = false;
	$scope.hasImageGallerySerivces = false;
	$scope.hasLocationServices = false;
	$scope.hasServicesListServices = false;
	$scope.hasContactFormServices = false;
	$scope.hasDiscrtitiveServices = false;
	$scope.hasSeatPlannerServices = false;
	
	$log.log("test message");
	
	$scope.startEndTimeList=[];
//	$scope.activeDate = new Date();
	$scope.selectedDates = new Array();
	$scope.mindatecurrent = new Date();
	$scope.showMulitdatePicker = false;
	
	$scope.maxdatecurrent = new Date();
	$scope.maxdatecurrent.setDate($scope.maxdatecurrent.getDate()-1);
	var startEndTime = {};
	startEndTime["startTimeEpoche"] = new Date();
	startEndTime.startTimeEpoche.setHours(9);
	startEndTime.startTimeEpoche.setMinutes(0);
	startEndTime["endTimeEpoche"] = new Date();
	startEndTime.endTimeEpoche.setHours(21);
	startEndTime.endTimeEpoche.setMinutes(0);
	$scope.startEndTimeList.push(startEndTime);
//	console.log("$rootScope.userProfile...",$rootScope.userProfile.userTimeZone);
//	startEndTime = {
//			"endTimeTimeEpoche":1378999800000,
//			"startTimeEpoche":1378956600000,
//			"startTimeEpocheMin":"",
//			"endTimeTimeEpocheMin":1378956600000,
//		   };
//	$scope.startEndTimeList.push(startEndTime);
	
	$scope.time="";
	
	$scope.ampmButton = true;
	$scope.mytime = new Date(60450661000);
	$scope.mytime2 = new Date(60450661000);
	  $scope.hstep = 1;
	  $scope.mstep = 15;

	  $scope.options = {
	    hstep: [1, 2, 3],
	    mstep: [1, 5, 10, 15, 25, 30]
	  };

	  $scope.ismeridian = true;
	  
	  $scope.toggleMode = function() {
	    $scope.ismeridian = ! $scope.ismeridian;
	  };

	  $scope.update = function() {
	    var d = new Date();
	    d.setHours( 14 );
	    d.setMinutes( 0 );
	    $scope.mytime = d;
	  };

	  $scope.changed = function () {
	    console.log('Time changed to: ' ,$scope.servicesData.appointment.formData.startEndTimeList);
//	    $scope.$apply();
	  };

	  $scope.clear = function() {
	    $scope.mytime = null;
	  };
	
	
	
	
	$scope.appointment = {};
	$rootScope.isServicesShow = true;
	$scope.locationshareModule = {};
	$scope.imageGalleryModule = {};
	$scope.appointment.displayName = "";
//	$scope.appointment.startTime = $rootScope.formatAMPM(new Date());
//	$scope.appointment.endTime = $rootScope.formatAMPM(new Date());
	$scope.fileUploadMasg="";
	$scope.appointment.startTime = "";
	$scope.appointment.id = "";
	$scope.appointment.endTime = "";
	$scope.appointment.duration = "30";
	$scope.appointment.monChecked = true;
	$scope.appointment.tueChecked = true;
	$scope.appointment.wedChecked = true;
	$scope.appointment.thuChecked = true;
	$scope.appointment.friChecked = true;
	$scope.appointment.satChecked = false;
	$scope.appointment.sunChecked = false;
	$scope.appointment.modeselected = 1;
	
	$scope.hasAppoitnmentModule = false;
	$scope.haslocationShareModule = false;
	$scope.hasImageGalleryModule = false;
	$scope.servicesData = {};
	$scope.servicesData["imageGallery"] = {};
	
	
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
	Data.getWithHeader('user/getSelectUserSevicesForWeb/'+$rootScope.userinfo.user_id,headers)
		.then(function (result) {
//		console.log(angular.toJson(result.selectedServices.mainObjectServiceHasMap));
		console.log("getting data result..........",result);
		if(result.status == 200){
			$scope.servicesData = result.selectedServices.serviceMap;
			$scope.servicesData["appointment"] = {};
			$scope.servicesData["imageGallery"] = {};
			$scope.servicesData["locationShare"] = {};
			$scope.servicesData["serviceList"] = {};
			$scope.servicesData["formBuilder"] = {};
			$scope.servicesData["discritiveData"] = {};
			$scope.servicesData["seatPlannerServicesData"] = {};
			$.each(result.selectedServices.serviceMap,function(key,value){
				console.log("testing value",value.formData,$rootScope.isEmpty(value.formData));
				if(value.serviceType == 1){
					if($rootScope.isEmpty(value.formData)){
						value.formData = {};
						value.formData.selectedDates = new Array();
//						value.formData.activeDate = new Date();
						value.formData.startTime = "9:00 AM";
						value.formData.endTime = "9:00 PM";
						value.formData.duration = "30";
						value.formData.monChecked = true;
						value.formData.tueChecked = true;
						value.formData.wedChecked = true;
						value.formData.thuChecked = true;
						value.formData.friChecked = true;
						value.formData.satChecked = false;
						value.formData.sunChecked = false;
						value.formData.modeselected = 1;
						value.formData["startEndTimeList"] = $scope.startEndTimeList;
						$scope.maxdatecurrent = null;
						value.saveButtonShow = true;
						value.formEditDisabled = false;
						value.editButtonShow = false;
						
						appointmentoldDataformData = angular.toJson(value.formData);
						console.log(appointmentoldDataformData );
						appointmentoldDataformData  = JSON.parse(appointmentoldDataformData);
						
						console.log(appointmentoldDataformData );
					}else{
						
						if(!value.formData.hasOwnProperty('selectedDates')){
							value.formData.selectedDates = new Array();
						}

						
						
						value.editButtonShow = true;
						value.formEditDisabled = true;

						value.formData.startTimeEpoche = new Date(parseInt(value.formData.startTimeEpoche));
						value.formData.endTimeEpoche = new Date(parseInt(value.formData.endTimeEpoche));
						$.each(value.formData.startEndTimeList,function(key,values){
								
								values.startTimeEpoche = new Date(parseInt(values.startTimeEpoche));
								values.endTimeEpoche = new Date(parseInt(values.endTimeEpoche));
											
							
						});
						appointmentoldDataformData  = angular.toJson(value.formData);
						console.log(appointmentoldDataformData );
						appointmentoldDataformData  = JSON.parse(appointmentoldDataformData);
						console.log("value... appointment",value );
					}
					
					
					if(value.idString == $scope.serviceId){
						$scope.servicesData.appointment = value;
					}
					
				}else if(value.serviceType == 2){
					console.log($scope.servicesData);
					
					if(value.idString == $scope.serviceId){
						$scope.servicesData.imageGallery = value;
					}
					
					if($rootScope.isEmpty(value.formData)){
						
						$scope.servicesData["imageGallery"]["formData"]={};
						$scope.servicesData.imageGallery["formData"]["imageData"]=[];
					}else{
						
					}
					
					
					
				}else if(value.serviceType == 3){
					if($rootScope.isEmpty(value.formData)){
						value.formData = {};
						
						object = $rootScope.getCurrnetLatLong();
							
						value.formData.lattitue = object.lat;
						value.formData.longitude = object.long;
						value.formData.address = "";
					}
					
					var mapOptions = {
					        zoom: 10,
					        center: new google.maps.LatLng(value.formData.lattitue,value.formData.longitude),
					        mapTypeId: google.maps.MapTypeId.HYBRID
						};
						$scope.map = new google.maps.Map(document.getElementById('locatinSharingmap'), mapOptions);
						
						$scope.marker = new google.maps.Marker({
						      position: new google.maps.LatLng(value.formData.lattitue,value.formData.longitude),
						      map: $scope.map,
						  });
						$scope.marker.setMap ($scope.map);
						$scope.marker.setDraggable (true);
						
						google.maps.event.addListener($scope.marker, 'dragend', function (event) {
							   
//							alert("lat"+this.getPosition().lat()+"..lang"+this.getPosition().lng());
							
							$scope.servicesData.locationShare.formData.lattitue = this.getPosition().lat();
							$scope.servicesData.locationShare.formData.longitude = this.getPosition().lng();
							geocodePosition(this.getPosition());
						});
						
						
						if(value.idString == $scope.serviceId){
							$scope.servicesData.locationShare = value;
						}
						
				}else if(value.serviceType == 4){
					console.log(value);
					if(value.idString == $scope.serviceId){
						
						$scope.servicesData.serviceList = value;
					}
					
					console.log($scope.servicesData.serviceList);
					
					if($rootScope.isEmpty(value.formData)){
						
						value.formData = {};
						value.formData["viewData"] = [];
						var dummyScopInputFildVal = {"columnOne":{"featurOrSerivceName":"","placeholder":"Enter Serive Name"},
								 "columntwo":{"featurOrSerivceNamePrice":"","placeholder":"Enter Service Price"},
								 "columnThree":{"featurOrSerivceNameShowPrice":true}
								};
						value.formData["viewData"].push(dummyScopInputFildVal);
					}else{
						console.log("length.....",value.formData.viewData[value.formData.viewData.length-1]);
						if(value.formData.viewData[value.formData.viewData.length-1].columnOne.featurOrSerivceName !=""
						|| value.formData.viewData[value.formData.viewData.length-1].columntwo.featurOrSerivceNamePrice !=""){
							if(value.idString == $scope.serviceId){
								$scope.addMoreServiceFiled();
							}
							
						}
					}
					
					
					
					
				}else if(value.serviceType == 5){
					if(value.idString == $scope.serviceId){
						if(!$rootScope.isEmpty(value.formData)){
							console.log("$scope..................",$scope);
							$scope.servicesData.formBuilder = value;
							$scope.$broadcast('dataIsAvailable', value.formData);
						}else{
							$scope.servicesData.formBuilder = value;
						}
					
					}
				}else if(value.serviceType == 6){
					
					if(value.idString == $scope.serviceId){
//						if(!$rootScope.isEmpty(value.formData)){
//							value.formData["htmlText"] = "";
//						}
						
						
						
						
						
						$scope.api = {
							scope: $scope
						};
						
//						if($rootScope.isEmpty(value.formData)){
//							
//							value.formData = {};
//							value.formData["editorConfig"] = {};
//							value.formData["editorConfig"] = $scope.editorConfig;
//							value.formData["htmlText"] = "Enter the text here";
//						}else{
//							console.log("value.............",value);
//						}
						$scope.servicesData.discritiveData = value;
					}
				}else if(value.serviceType == 7){
					if(value.idString == $scope.serviceId){
						if(!$rootScope.isEmpty(value.formData)){
							$scope.servicesData.seatPlannerServicesData = value;
							
							
						}else{
							
							$scope.servicesData.seatPlannerServicesData = value;
							$scope.servicesData.seatPlannerServicesData["formData"] = {};
							$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapTemplatList"] = [];
							$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"] = [];
						}
					}
				}
			});

			
			/*$q.all(servicesAvailable).then(function success(data){
				 // Should all be here
			    }, function failure(err){
			      // Can handle this is we want
			 });*/
			
		}else{
			
		}
		
		if($scope.serviceType == 1){
			$scope.hasAppointmentSerivces = true;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 2){
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = true;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 3){
			$scope.locationTabclick();
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = true;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 4){
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = true;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 5){
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = true;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 6){
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = true;
			$scope.hasSeatPlannerServices = false;
		}else if($scope.serviceType == 7){
			$scope.hasAppointmentSerivces = false;
			$scope.hasImageGallerySerivces = false;
			$scope.hasLocationServices = false;
			$scope.hasServicesListServices = false;
			$scope.hasContactFormServices = false;
			$scope.hasDiscrtitiveServices = false;
			$scope.hasSeatPlannerServices = true;
			
			 
			 
		}
		
	});
	
	
	$scope.canvasWidth = 400;
	$scope.canvasHeight = 300;
		
	$scope.showCanvas = function() {
		 console.log($('#layoutcontainerTable').outerHeight());
		 console.log($('#layoutcontainerTable').outerWidth());
		 
		 $scope.canvasWidth = $('#layoutcontainerTable').outerWidth();
		 $scope.canvasHeight = $('#layoutcontainerTable').outerHeight();
		 $("#canvasContainer").show();
		 init2(false);
		
	};	
	
	
	
	$scope.addMoreTime = function(timedataList) {
		
		if(!$rootScope.isEmpty(timedataList));
		
		console.log("startEndTime.startEndTime... ..",new Date(timedataList[timedataList.length-1].endTimeEpoche).getTime()+(1*60*60*1000));
		
		var startEndTime = {};
		startEndTime["startTimeEpoche"] = new Date(new Date(timedataList[timedataList.length-1].endTimeEpoche).getTime()+(1*60*60*1000));
		console.log("startEndTime.startEndTime... ..",startEndTime.startTimeEpoche);
		console.log("new Date(startEndTime.startEndTime).getTime()..",new Date(startEndTime.startTimeEpoche).getTime());
		startEndTime["endTimeEpoche"] = new Date(new Date(startEndTime.startTimeEpoche).getTime()+(2*60*60*1000));
//		startEndTime["startTimeEpocheMin"] = timedataList[timedataList.length-1].endTimeEpoche;
//		startEndTime["endTimeEpochemin"]= startEndTime.startTimeEpoche;
		timedataList.push(startEndTime);
		
//		timedataListNew  = new Array();;
//		timedataListNew = angular.toJson(timedataList);
//		timedataList = new Array();
//		timedataList = JSON.parse(timedataListNew);
//		
//		$scope.servicesData.appointment.formData.startEndTimeList = new Array();
//		
//		$scope.servicesData.appointment.formData.startEndTimeList = JSON.parse(timedataListNew);
		console.log("timedataList...",timedataList);
	};
	$scope.removeTimeing = function(index,timedataList) {
		
		
		$scope.servicesData.appointment.formData.startEndTimeList.splice(index,1);
	};
	
	$scope.showImageMasge = function(massege){
		 
		Notification.success(massege); 
		$scope.fileUploadMasg  = massege;
		 
	};
	 $scope.complete = function(content,data) {
	      console.log(content); // process content
	      if(content.status == 200){
	    	 
	    	  $scope.servicesData.imageGallery.formData["imageData"].push({"imageId":content.fileStoredId,
    			  "comment":data.commentText});
	    	/*  $scope.servicesData.imageGallery.formData["FileId"+content.fileStoredId] = {"imageId":content.fileStoredId,
	    			  "comment":data.commentText};*/
	    	  
	    	  
	    	  $scope.saveValue(data);
	    	  data.commentText = "";
//	    	  $scope.fileUploadMasg = "File uploaded";
	    	  $scope.showImageMasge("File uploaded");
	    	  $("#imageGalleryFile").val("");
	    	 
	      }else{
	    	  $scope.showImageMasge("There was a error while uploading file");
//	    	  $scope.fileUploadMasg = "There was a error while uploading file";
	    	  $("#imageGalleryFile").val("");
	    	 
	      }
	      
	 }
	
	
	
	
	$scope.saveValue = function(data){
		var dataTemp = angular.toJson(data);
		var newdata = {};
		newdata = JSON.parse(dataTemp);
		
		 
		console.log(data);
		console.log($scope);
		if(newdata.serviceType == 1){
			var timeFlag = true;
			var i = 0;
			var oldEnddate = "";
			$.each(newdata.formData.startEndTimeList,function(key,value){
				
				var startDate = new Date(value.startTimeEpoche);
				var endDate = new Date(value.endTimeEpoche);
				
				console.log("startDate time...",startDate.getTime());
				console.log("endDate time...",endDate.getTime());
				console.log("condition 1...",startDate.getTime() < endDate.getTime());
				
				console.log("condition 1...",1378956600000 < 1378967400000);
				
				if(startDate.getTime() < endDate.getTime()){
					
					if(i != 0){
						
						console.log("condition 2...",startDate.getTime() < oldEnddate.getTime());
						if(startDate.getTime() < oldEnddate.getTime()){
							
							Notification.error('Please fill proper time slot');
							timeFlag = false;
							return false;
						}
					}
					
					oldEnddate = endDate;
					
					value.startTimeEpoche =$rootScope.formatAMPM(new Date(value.startTimeEpoche)) ;
					value.endTimeEpoche = $rootScope.formatAMPM(new Date(value.endTimeEpoche));
				}else{
					
					Notification.error('Please fill proper time slot');
					timeFlag = false;
					return false;
				}
				i++;
				
			});
			
			
			if(!timeFlag)return false;
			
//			$.each(newdata.formData.selectedDates,function(key,value){
//				
//			});
			var log = [];
			
			angular.forEach(newdata.formData.selectedDates, function(value, key) {
				console.log(value);
				newdata.formData.selectedDates[key] = $rootScope.getDateFromEpohe(new Date(parseInt(value)));
				console.log(value);
			},log);
		}
		
		
		
		if(newdata.serviceType == 4){
			var viewDataToSeave = [];
			$.each(newdata.formData.viewData,function(key,value)	{
				console.log(key,value);
				
				if(value.columnOne.featurOrSerivceName =="" && 
				  value.columntwo.featurOrSerivceNamePrice ==""){
//					console.log("key...",key,"data.formData.viewData[key]",data.formData.viewData[key]);
					if(newdata.formData.viewData.length-1 == key){
						viewDataToSeave.push(value);
					}
				}else{
					
					viewDataToSeave.push(value);
				}
			});
			console.log(viewDataToSeave);
			data.formData.viewData = viewDataToSeave;
			console.log("key...data.formData.viewData[key]",data.formData.viewData);
		}
	
		console.log("...data.formData",newdata);
		
		var dataToSend = {};
		dataToSend["userTimeZone"] = $rootScope.userTimeZone;
		dataToSend["timeZone"] = $rootScope.timezone;
		dataToSend["serviceDtoOtherObject"] = newdata;
		
		console.log("...data.formData",dataToSend);
		
		
//		return false;
		Data.post('user/saveServicesData', dataToSend).then(function (result) {
			if(result.status == 200){
//				alert("data Saved");
				data.saveButtonShow = false;
				data.editButtonShow = true;
				data.formEditDisabled = true;
				$scope.maxdatecurrent = new Date();
				$scope.maxdatecurrent.setDate($scope.maxdatecurrent.getDate()-1);
				$scope.ampmButton = false;
				Notification.success('Data Saved');
				if(data.serviceType == 1){
					appointmentoldDataformData = angular.toJson(data.formData);
					appointmentoldDataformData = JSON.parse(appointmentoldDataformData);
					var timedataListNew  = new Array();;
					timedataListNew = angular.toJson($scope.servicesData.appointment.formData.startEndTimeList);
					
					$scope.servicesData.appointment.formData.startEndTimeList = new Array();
					
					$scope.servicesData.appointment.formData.startEndTimeList = JSON.parse(timedataListNew);
				}else if(data.serviceType == 2){
					$scope.servicesData.imageGallery["deltedImage"] = false;
				}else if(data.serviceType == 4){
					console.log(data.formData.viewData[data.formData.viewData.length-1]);
					if(data.formData.viewData[data.formData.viewData.length-1].columnOne.featurOrSerivceName !=""
					|| data.formData.viewData[data.formData.viewData.length-1].columntwo.featurOrSerivceNamePrice !=""){
						$scope.addMoreServiceFiled();
					}
				}
//				$scope.$apply();
			}else{
				alert("opps error occure");
			}
		});
		
	};
	$scope.cancelSave = function(data){
		data.saveButtonShow = false;
		data.editButtonShow = true;
		data.formEditDisabled = true;
		
		$scope.ampmButton = false;
//		console.log(data.formData);
		console.log(appointmentoldDataformData);
		
		data.formData = appointmentoldDataformData;
		
		appointmentoldDataformData = angular.toJson(data.formData);
		appointmentoldDataformData = JSON.parse(appointmentoldDataformData);
//		$scope.ismeridian = false;
		console.log(data.formData);
//		$scope.$apply();
		
	};
	$scope.showTimesBtn = function(index,flag){
		console.log(index,"...",$scope["isTimesShow"+index]);
		$scope["isTimesShow"+index] = flag;
//		$scope["iseditShow"+index] = false;
	};
	$scope.saveImagedataEdited = function(index){
		$scope["isTimesShow"+index] = false;
		$scope.saveValue($scope.servicesData.imageGallery);
	}
	
	$scope.deleteImageAndData = function(index){
		console.log("...",index);
//		formDataKey = $.trim(formDataKey);
		
//		
//		console.log($scope.servicesData.imageGallery.formData);
		
//		$scope["isTimesShow"+index] = false;
//		$scope.servicesData.imageGallery["deltedImage"] = true;
//		$scope.servicesData.imageGallery.imageTodeletId = data.imageId;
		
		$scope.servicesData.imageGallery.formData.imageData.splice(index,1);
		
//		return false;
		$scope.saveValue($scope.servicesData.imageGallery);
		
	};
	
	$scope.clicked = function(event) {
//	    alert(' clicked');
	    if(event){
//	      event.stopPropagation();
	      event.preventDefault();
	    }
	  }
	
	$(".linkClickClass11").click(function(e){
		e.preventDefault();
	});
	
	$(document).on("click",".accoridanClick",function(e){
//		alert("here");
		e.preventDefault();
		return false;
	});
	
	
	$scope.showButton = function(data){
		
		$scope.maxdatecurrent = null;
		data.saveButtonShow = true;
		data.formEditDisabled = false;
		data.editButtonShow = false;
		$scope.ampmButton = true;
		var timedataListNew  = new Array();;
		timedataListNew = angular.toJson($scope.servicesData.appointment.formData.startEndTimeList);
		
		$scope.servicesData.appointment.formData.startEndTimeList = new Array();
		
		$scope.servicesData.appointment.formData.startEndTimeList = JSON.parse(timedataListNew);
//		$scope.ismeridian = true;
	}
	$scope.useCurrentLocation = function(){
		var object = $rootScope.getCurrnetLatLong();
		
		console.log(object);
		
		$scope.servicesData.locationShare.formData.lattitue  = object.lat;
		$scope.servicesData.locationShare.formData.longitude = object.long;
		
		$scope.marker.position = new google.maps.LatLng(object.lat,object.long);
//		google.maps.event.trigger($scope.map, 'resize')
    	moveBus( $scope.map, $scope.marker);
//    	$scope.servicesData.locationShare.formData["address"] = $rootScope.getAddressFromLatLong(object.lat,object.long);
    	
//    	console.log();
    	$rootScope.getAddressFromLatLong(object.lat,object.long,function(address){
    		
    		$scope.servicesData.locationShare.formData.address = address;
    		$scope.$apply();
    		console.log($scope.servicesData.locationShare.formData.address);
    		
    	});
	}
	
	
	
	
	
	
	
	
	
	$scope.addMoreServiceFiled = function(){
		var dummyScopInputFildVal = {"columnOne":{"featurOrSerivceName":"","placeholder":"Enter Serive Name"},
				 "columntwo":{"featurOrSerivceNamePrice":"","placeholder":"Enter Service Price"},
				 "columnThree":{"featurOrSerivceNameShowPrice":true}
				};
		dummyScopInputFildVal = angular.toJson(dummyScopInputFildVal);
		
		dummyScopInputFildVal = JSON.parse(dummyScopInputFildVal);
		console.log($scope.servicesData.serviceList);
//		$scope.servicesData.serviceList.formData["viewData"] = [];
		$scope.servicesData.serviceList.formData["viewData"].push(dummyScopInputFildVal);
		
		console.log($scope.servicesData.serviceList.formData.viewData);
	};
	$scope.removeService = function(index){
//		console.log("removeService....123456 index...",index,"....",$scope.servicesData.serviceList.formData.viewData);
		 $scope.servicesData.serviceList.formData.viewData.splice(index,1);
//		delete $scope.servicesData.serviceList.formData.viewData[index];
		
		console.log($scope.servicesData.serviceList.formData.viewData);
	}
	$scope.locationTabclick = function(){
//		alert('afterShow');
		$scope.myFunction();
	}
	var  timer = ""; 
	$scope.myFunction = function(){
//		alert('afterShow');
		if(timer !=""){
			 clearTimeout(timer);
		}
		
		timer = setTimeout(function(){google.maps.event.trigger($scope.map, 'resize');
//									 google.maps.event.trigger(map, 'resize');
									 
									
									 moveBus( $scope.map, $scope.marker );
		}, 200);
		
//		google.maps.event.trigger(map, 'resize');
	}
	
	function geocodePosition(pos) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
		    latLng: pos
		  }, function(responses) {
		    if (responses && responses.length > 0) {
//		      updateMarkerAddress();
		    	console.log(responses[0].formatted_address);
		    	/*$("#loactioNaddress").val("");
		    	$("#loactioNaddress").focus();*/
		    	$scope.servicesData.locationShare.formData.address = responses[0].formatted_address;
		    	$("#loactioNaddress").val($scope.servicesData.locationShare.formData.address);
		    } else {
		    	console.log('Cannot determine address at this location.');
		    }
		  });
		}

	function moveBus( map, marker ) {
		console.log("here");
	    marker.setPosition( new google.maps.LatLng($scope.servicesData.locationShare.formData.lattitue,
	    		$scope.servicesData.locationShare.formData.longitude));
	    map.panTo(new google.maps.LatLng($scope.servicesData.locationShare.formData.lattitue,
	    		$scope.servicesData.locationShare.formData.longitude));

	};
	
	$scope.addressChange = function(valuethis){
		console.log(valuethis);
		$scope.getLatLngFromAddress(valuethis);
	}
	
	$scope.getLatLngFromAddress = function (address){

//		console.log(address);
		  var geocoder = new google.maps.Geocoder();

		  geocoder.geocode( { 'address': address}, function(results, status) {
			  
//			  console.log(results);
		    if (status == google.maps.GeocoderStatus.OK) {
		      
		    	
		    	$scope.servicesData.locationShare.formData.lattitue = results[0].geometry.location.lat();
		    	$scope.servicesData.locationShare.formData.longitude = results[0].geometry.location.lng();
		    	
		    	
//		    	console.log($scope.marker); 
		    	/*$scope.marker = new google.maps.Marker({
				      position: new google.maps.LatLng($scope.servicesData.locationShare.formData.lattitue,
				    		  $scope.servicesData.locationShare.formData.longitude),
				      map: $scope.map,
				  });*/
		    	$scope.marker.position = new google.maps.LatLng($scope.servicesData.locationShare.formData.lattitue,
			    		  $scope.servicesData.locationShare.formData.longitude);
		    	moveBus( $scope.map, $scope.marker);
		    	/*$scope.marker.setMap ($scope.map);
				$scope.marker.setDraggable (true);
				*/
			/*	console.log(results[0].geometry.location.lat());
		    	console.log(results[0].geometry.location.lng());*/
		    	
		    	/*$('#latitude').val(results[0].geometry.location.Pa);
		      $('#longitude').val(results[0].geometry.location.Qa);*/

		    } else {
		      console.log("Geocode was not successful for the following reason: " + status);
		    }
		  });
		}
/*	$(document).on("click",".headingClass",function(){
		console.log($(this));
		
		$(".headingClass").each(function(){
			if($(this).next().hasClass("in")){
				
//				$(this).toggle();
				$(this).next().toggle();
				$(this).addClass("collapsed");
				$(this).attr("aria-expanded",false);
				$(this).next().removeClass("in");
				$(this).next().attr("aria-expanded",false);
			}
			
		});
		
//		$(this).next().toggle();
		if()
		$(this).removeClass("collapsed");
		$(this).attr("aria-expanded",true);
		$(this).next().addClass("in");
	});*/
	
	
	
	
	
	
	
	
	
	
	
	// Last updated November 2010 by Simon Sarris
	// www.simonsarris.com
	// sarris@acm.org
	//
	// Free to use and distribute at will
	// So long as you are nice to people, etc

	// This is a self-executing function that I added only to stop this
	// new script from interfering with the old one. It's a good idea in general, but not
	// something I wanted to go over during this tutorial
//	(function(window) {

	
/**
 * Seat plan map code start here
 * 
 */	
	
	$scope.addTemplatesClick = false;
	$scope.hideTemplatesCleck = false;
	$scope.numOfRow = 15;
	$scope.numOfCol = 6;
	$scope.cuurentTemplateIndex = 0;
	$scope.cuurentTemplateName = "";
	$scope.addMoreTempates = function() {
		$scope.addTemplatesClick = true;
//		console.log($scope.addTemplatesCleck);
		$scope.mapTemplatesName = "";
		$scope.numOfRow = 15;
		$scope.numOfCol = 6;
	}
	$scope.mapTemplatesName ="Rahul";
	$scope.intializeDataForView = function() {
		console.log($scope.cuurentTemplateName);
		
		if(!$rootScope.isEmpty($scope.cuurentTemplateName)){
//			$scope.cuurentTemplateName = $scope.mapTemplatesName;
			$scope.floorPlanDataTemples.numOfRow = $scope.numOfRow ;
			$scope.floorPlanDataTemples.numOfCol = $scope.numOfCol;
			$scope.floorPlanDataTemples["seatCateories"]=[];
			$scope.creatView();
			$scope.hideTemplatesCleck = true;
		}else{
			Notification.warning("Please enter Templates Name");
		}
	};	
	
	$scope.showSessionAddnew = false;
	$scope.showSessionData = false;
	$scope.showaddingForm = true;
	$scope.eventSessioName = "";
	$scope.session = {};
	$scope.floorMapsessionData = {};
	$scope.addNewSession = function() {
		$scope.showSessionAddnew = true;
		$scope.showSessionData = false;
		$scope.eventSessioName = "";
	};
	$scope.tabClick = function(clickFor){
		$scope.floorPlanDataTemples = {};
		$scope.addTemplatesClick = false;
		$scope.hideTemplatesCleck = false;
		$scope.showSessionData = false;
		$scope.showSessionAddnew = false;
//		$scope.session = {};
		if(clickFor == "floorPlanTemples"){
			
		}else if(clickFor == "mannageSession"){
			$.each($scope.servicesData.seatPlannerServicesData.formData.serviceMapSessionsList,
					function(key,value) {
						console.log(key,value);
						
//						value  = angular.toJson(value);
//						value = JSON.parse(value);
						$scope.getFloorPlanSessionDetailsWithReturnValue(value);
			});
			$.each($scope.servicesData.seatPlannerServicesData.formData.serviceMapSessionsList,
					function(key,value) {
						console.log(key,value);
						
						value  = angular.toJson(value);
						value = JSON.parse(value);
//						$scope.getFloorPlanSessionDetailsWithReturnValue(value);
			});
		}
	};
	$scope.backToSessionlistDataData = function() {
		$scope.showSessionAddnew = false;
		$scope.showSessionData = false;
		$scope.showaddingForm = true;
		
		$scope.eventSessioName = "";
		$scope.session = {};
	}
	$scope.deleteSessionSechduleData =function(floorPlanSessionData){
		
		console.log(floorPlanSessionData);
//		return false;
		var datatoSend = {};
		datatoSend["stringId"] = floorPlanSessionData.stringId;
		datatoSend["serviceId"] = floorPlanSessionData.serviceId;
		datatoSend["userid"] = floorPlanSessionData.userid;
		datatoSend["timeZone"] = $rootScope.clientTimeZone;
		Data.post('FloorPlanSession/deleteActiveSessionFloorPlanData', datatoSend).then(function (result) {
			console.log(result);
			if(result.status == 200){
				Notification.success("Session deleted Successfully");
				$scope.tabClick('mannageSession');
			}
		});
	};
	$scope.deleteFloorPlanSessionData = function(serviceMapSessions,index){
		var sessionNameIdString = serviceMapSessions.sessionNameIdString;
		var datatoSend = {};
		datatoSend["stringId"] = sessionNameIdString;
		datatoSend["serviceId"] = $scope.serviceId;
		datatoSend["userid"] = $rootScope.userinfo.user_id;
		Data.post('FloorPlanSession/deleteActiveSessionData', datatoSend)
			.then(function (result) {
				if(result.status == 200){
					$scope.servicesData.seatPlannerServicesData.formData.serviceMapSessionsList.splice(index,1);
					var dataTosendseatPlannerServicesData={};
					dataTosendseatPlannerServicesData = angular.toJson($scope.servicesData.seatPlannerServicesData);
					dataTosendseatPlannerServicesData = JSON.parse(dataTosendseatPlannerServicesData);
					try {
						$.each(dataTosendseatPlannerServicesData.formData.serviceMapSessionsList,
								function(key,value){
							
							delete value.floorPlanDataTemples;
							delete value.floorPlanRecurciveSessionData;
							console.log(value);
						});
					} catch (e) {
						// TODO: handle exception
					}
					$scope.saveValue(dataTosendseatPlannerServicesData);
				}else{
					
				}
		});
	}
	$scope.currrentSessionIndex = 0;
	$scope.getFloorPlanSessionDetails = function(serviceMapSessions,index) {
		$scope.currrentSessionIndex = index;
		var sessionNameIdString = serviceMapSessions.sessionNameIdString;
		var datatoSend = {};
		datatoSend["stringId"] = sessionNameIdString;
		datatoSend["serviceId"] = $scope.serviceId;
		datatoSend["userid"] = $rootScope.userinfo.user_id;
		datatoSend["timeZone"] = $rootScope.clientTimeZone;
		Data.post('FloorPlanSession/getFloorPlanSessionData', datatoSend).then(function (result) {
			console.log("results...",result);
			if(result.status == 200){
				$scope.showSessionAddnew = false;
				$scope.showSessionData =true;
				$scope.cuurentTemplateName = serviceMapSessions.sessionName;
				$scope.floorPlanSessionData = result.floorPlanSessionData;
				$scope.floorPlanDataTemples = result.floorPlanSessionData.floorPlanDataTemples;
				
//				if($rootScope.isEmpty($scope.floorPlanDataTemples))
			}
		});
	}
	var modalInstance = "";
	$scope.showmapViewClick = false;
	$scope.getFloorPlanSessionDetailsWithNewImplemntation = function(serviceMapSessions,index) {
		$scope.currrentSessionIndex = index;
		console.log(serviceMapSessions);
		var sessionNameIdString = serviceMapSessions.sessionNameIdString;
				
				$scope.showmapViewClick = false;
//				alert($scope.showmapViewClick);
//				$scope.showSessionAddnew = true;
				$scope.showSessionData =true;
				$scope.datesForRecurtion = serviceMapSessions.floorPlanSessionData.selectedDates[0];
				$scope.cuurentTemplateName = serviceMapSessions.sessionName;
				$scope.floorPlanSessionData = serviceMapSessions.floorPlanSessionData;
//				
				$scope.floorPlanDataTemples = serviceMapSessions.floorPlanSessionData.floorPlanDataTemples;
//				$("#sessionMoreDetailsModal").modal("show");
			
				modalInstance = $uibModal.open({
				      animation: true,
				      templateUrl: 'templates/view/subTemplates/sessionMoreDetailsModal.html',
				      controller: 'ModalInstanceCtrl',
				      size: 'lg modal-dialog-myModeal',
				      resolve: {
				    	  parentScope: function () {
				            return $scope;
				          }
				        }
				    });
//			
	}
	
	$scope.getFloorPlanSessionDetailsWithReturnValue = function(serviceMapSessions) {
		
		
		var datatoSend = {};
		datatoSend["stringId"] = serviceMapSessions.sessionNameIdString;
		datatoSend["serviceId"] = $scope.serviceId;
		datatoSend["userid"] = $rootScope.userinfo.user_id;
		datatoSend["timeZone"] = $rootScope.clientTimeZone;
		Data.post('FloorPlanSession/getFloorPlanSessionData', datatoSend).then(function (result) {
			console.log("results...",result);
			if(result.status == 200){
				
				
				serviceMapSessions.floorPlanSessionData = result.floorPlanSessionData;
				serviceMapSessions.floorPlanDataTemples = result.floorPlanSessionData.floorPlanDataTemples;
				serviceMapSessions.floorPlanRecurciveSessionData = result.floorPlanRecurciveSessionData;
//				return dummyScope;
//				if($rootScope.isEmpty($scope.floorPlanDataTemples))
			}
		});
	}
	
	$scope.addNewSessionDataToDb =  function() {
		var datatoSend = $scope.session;
		
		
		datatoSend["sessionTemeplates"] = JSON.parse($scope.session.sessionTemeplates);
		
		datatoSend["serviceId"] = $scope.serviceId;
		datatoSend["userid"] = $rootScope.userinfo.user_id;
		datatoSend["timeZone"] = $rootScope.clientTimeZone;
		console.log(datatoSend);
		Data.post('FloorPlanSession/saveFloorPlanSessionData', datatoSend).then(function (result) {
			console.log(result);
			if(result.status == 200){
//				return false;
				$scope.showSessionAddnew = false;
				$scope.showSessionData =true;
				var serviceMapSessions = {};
				serviceMapSessions["sessionName"] = result.floorPlanSessionData.eventSessioName;
				serviceMapSessions["sessionNameIdString"] = result.floorPlanSessionData.stringId;
				$scope.floorPlanDataTemples = result.floorPlanSessionData.floorPlanDataTemples;
				$scope.floorPlanSessionData = result.floorPlanSessionData;
				var flag = false;
				if($scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"].lenght ==0){
					console.log("here in 1st condition");
					$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"].push(serviceMapSessions);
					
				}else{
					console.log("here in else ");
					$.each($scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"],function(keu,value){
						if(value.sessionNameIdString == result.floorPlanSessionData.stringId){
							console.log("here in 2nd condition");
							flag = true;
							return false;
						}
					});
				}
				console.log(flag);
				if(!flag){
					$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"].push(serviceMapSessions);
				}else{
					
					$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapSessionsList"].push(serviceMapSessions);
				}
				console.log($scope.servicesData.seatPlannerServicesData);
				$scope.floorPlanDataTemples.seaTPlanData = result.floorPlanSessionData.floorPlanDataTemples.seaTPlanData;
				
				$scope.floorPlanDataTemples.seaTPlanDataFirstRow = result.floorPlanSessionData.floorPlanDataTemples.seaTPlanDataFirstRow;
				
				$scope.floorPlanDataTemples.numOfRow = result.floorPlanSessionData.floorPlanDataTemples.numOfRow;
				$scope.floorPlanDataTemples.numOfCol = result.floorPlanSessionData.floorPlanDataTemples.numOfCol;
				var dataTosendseatPlannerServicesData={};
				dataTosendseatPlannerServicesData = angular.toJson($scope.servicesData.seatPlannerServicesData);
				dataTosendseatPlannerServicesData = JSON.parse(dataTosendseatPlannerServicesData);
				try {
					$.each(dataTosendseatPlannerServicesData.formData.serviceMapSessionsList,
							function(key,value){
						
						delete value.floorPlanDataTemples;
						delete value.floorPlanRecurciveSessionData;
						console.log(value);
					});
				} catch (e) {
					// TODO: handle exception
				}
				$scope.saveValue(dataTosendseatPlannerServicesData);
				$scope.session = {};
				$scope.tabClick("mannageSession");
//				$location.path('/serviceDashBoard/'+$scope.serviceId+'/'+$scope.serviceType+'/mannageSession');
//				$scope.creatView();
				
			}
		});
		
	};
	
	$scope.catergoryValue = "";
	$scope.creatView = function() {
		$scope.floorPlanDataTemples.seaTPlanData = {};
		$scope.floorPlanDataTemples.seaTPlanDataFirstRow = {};
		$scope.floorPlanDataTemples.seaTPlanData["seatRows"] = [];
		$scope.floorPlanDataTemples.seaTPlanDataFirstRow["seatRows"] = [];
		for(var i=1;i<= $scope.floorPlanDataTemples.numOfRow;i++){
			var seatRow = {};
			seatRow["seatColumns"] = [];
			var column = {};
			column = {
					"columnShow":false,
					"columnDisabledd":false,
					"columnRemoved":true,
					"columnStatus":0,
					"columnStatusLable":alphabet[i-1]
			};
			seatRow["seatColumns"].push(column);
			for(var j=1;j<=$scope.floorPlanDataTemples.numOfCol;j++){
				
				column = {
						"columnShow":true,
						"columnDisabledd":false,
						"columnRemoved":false,
						"columnStatus":0,
						"columnStatusLable":alphabet[i-1]
				};
				seatRow["seatColumns"].push(column);
			}
			column = {
					"columnShow":false,
					"columnDisabledd":false,
					"columnRemoved":true,
					"columnStatus":0,
					"columnStatusLable":alphabet[i-1]
			};
			seatRow["seatColumns"].push(column);
			$scope.floorPlanDataTemples.seaTPlanData["seatRows"].push(seatRow);
		}
		if($scope.floorPlanDataTemples.seaTPlanData.seatRows.length != 0){
			columnsData = [];
			columnsData = angular.toJson($scope.floorPlanDataTemples.seaTPlanData.seatRows[0]);
			columnsData = JSON.parse(columnsData);
			
			$scope.floorPlanDataTemples.seaTPlanDataFirstRow["seatRows"].push(columnsData);
			

		}
		console.log($scope.floorPlanDataTemples.seaTPlanData);
		console.log($scope.floorPlanDataTemples.seaTPlanDataFirstRow);
		

	}
	
	
	$scope.floorPlanDataTemples = {};
	
//	if(!$rootScope.isEmpty($scope.servicesData.seatPlannerServicesData)){
//		
//		
////$scope.creatView();
//	}else{
////		$scope.floorPlanDataTemples["seaTPlanData"] = {};
////		$scope.floorPlanDataTemples["seaTPlanDataFirstRow"] = {};
////		
////		$scope.floorPlanDataTemples["seatCateories"] = [];
////		$scope.floorPlanDataTemples["numOfRow"] = 15;
////		$scope.floorPlanDataTemples["numOfCol"] = 6;
//
//	}
	

	$scope.addCategory = function() {
		console.log("category",$scope);
		if(!$rootScope.isEmpty($scope.catergoryValue)){
			var value = {
					"categoryName":$scope.catergoryValue,
					"categoryPrice":"0"
				};
			var category = {"category":value};
			$scope.floorPlanDataTemples.seatCateories.push(category);
			$scope.catergoryValue = "";
		}else{
			
		}
		
	};
	

	$scope.categoryChange = function(seatRow,seatCateory) {
		
		console.log(seatCateory,seatRow);
		
		$.each(seatRow.seatColumns,function(key,value){
			value["columnSeatCateory"] = seatCateory;
			console.log(key,value)
		});
	}
	
	$scope.deleteCategory = function(index) {
		$scope.floorPlanDataTemples.seatCateories.splice(index,1);
		
	}
	
	
	$scope.addExtraCell =function(seatRow,index){
		
		var elementIndex = $scope.floorPlanDataTemples.seaTPlanData.seatRows.indexOf(seatRow);
		console.log(elementIndex,"......",index);
		
		
		$.each($scope.floorPlanDataTemples.seaTPlanData.seatRows,function(keyOuter,valueOuter){
			
			console.log(keyOuter);
			$.each(valueOuter.seatColumns,function(key,value){
//				
				if(keyOuter == elementIndex){
					
					if(key == index){
//						console.log("key....",key,".....vaule",value)
//						console.log("Now here i am");	
						
						
						column = {};
						column = {"columnShow":true,"columnDisabledd":false,"columnRemoved":false,"columnStatus":0,"columnStatusLable":valueOuter.seatColumns[0].columnStatusLable};
						
						
						if(index == 0){
							$scope.floorPlanDataTemples.seaTPlanData.seatRows[keyOuter].seatColumns.splice(key+1,0,column);
						}else{
							$scope.floorPlanDataTemples.seaTPlanData.seatRows[keyOuter].seatColumns.splice(key,0,column);
						}
						
						
					}
				}else{
					if(key == index){
						column = {};
						column = {"columnShow":true,"columnDisabledd":false,"columnRemoved":true,"columnStatus":0,"columnStatusLable":valueOuter.seatColumns[0].columnStatusLable};
						
						if(index == 0){
							$scope.floorPlanDataTemples.seaTPlanData.seatRows[keyOuter].seatColumns.splice(key+1,0,column);
						}else{
							$scope.floorPlanDataTemples.seaTPlanData.seatRows[keyOuter].seatColumns.splice(key,0,column);
						}
					}
				}
//				
			});
			
			
			
			
		});
//		return false;
		var column = {
				"columnShow":false,
				"columnDisabledd":false,
				"columnRemoved":true,
				"columnStatus":0,
				"columnStatusLable":""
		};
//		$scope.floorPlanDataTemples.seaTPlanDataFirstRow[index].splice(index+1, 0, column);
		if(index == 0){
			$scope.floorPlanDataTemples.seaTPlanDataFirstRow.seatRows[0].seatColumns.splice(index+1, 0, column)
//			$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"][0].splice(index+1, 0, column);
		}else{
			$scope.floorPlanDataTemples.seaTPlanDataFirstRow.seatRows[0].seatColumns.splice(index, 0, column)
			
		}
		
		
//		console.log($scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"],"\n ",$scope.servicesData.seatPlannerServicesData.formData["seaTPlanDataFirstRow"]);
		
		$scope.refreshView();
//		$scope.floorPlanDataTemples.seaTPlanData[elementIndex].splice(index+1, 0, columnsData);
	}
	
	
	$scope.addExtraRow = function() {
		var previuosRow = angular.toJson($scope.floorPlanDataTemples.seaTPlanData.seatRows[$scope.floorPlanDataTemples.seaTPlanData.seatRows.length-1]);
		console.log(previuosRow)
		
		$scope.refreshView();
		$scope.floorPlanDataTemples.seaTPlanData.seatRows.push(JSON.parse(previuosRow));
		previuosRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows[$scope.floorPlanDataTemples.seaTPlanData.seatRows.length-1];
		$scope.floorPlanDataTemples.numOfCol = $scope.floorPlanDataTemples.seaTPlanData.seatRows[0].seatColumns.length-2;
		$scope.floorPlanDataTemples.numOfRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows.length;
		
		$.each(previuosRow.seatColumns,function(key,value){
			value.columnStatusLable= alphabet[$scope.floorPlanDataTemples.numOfRow-1];
		});
	}
	
	$scope.addExtraRowAfterFirstRow = function() {
		
		var previuosRow = angular.toJson($scope.floorPlanDataTemples.seaTPlanData.seatRows[0]);
		
//		console.log(previuosRow)
		
		$scope.floorPlanDataTemples.seaTPlanData.seatRows.unshift(JSON.parse(previuosRow));
		
		$scope.refreshView();
		previuosRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows[$scope.floorPlanDataTemples.seaTPlanData.seatRows.length-1];
		$scope.floorPlanDataTemples.numOfCol = $scope.floorPlanDataTemples.seaTPlanData.seatRows[0].seatColumns.length-2;
		$scope.floorPlanDataTemples.numOfRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows.length;
		
		$.each(previuosRow.seatColumns,function(key,value){
			value.columnStatusLable= alphabet[$scope.floorPlanDataTemples.numOfRow-1];
		});
		
	}
	
	$scope.refreshView = function() {
		
		$scope.floorPlanDataTemples.seaTPlanDataFirstRow = angular.toJson($scope.floorPlanDataTemples.seaTPlanDataFirstRow);
		$scope.floorPlanDataTemples.seaTPlanDataFirstRow = JSON.parse($scope.floorPlanDataTemples.seaTPlanDataFirstRow);
		
		$scope.floorPlanDataTemples.seaTPlanData = angular.toJson($scope.floorPlanDataTemples.seaTPlanData);
		$scope.floorPlanDataTemples.seaTPlanData = JSON.parse($scope.floorPlanDataTemples.seaTPlanData);
		
		try {
			$scope.floorPlanDataTemples.seatCateories = angular.toJson($scope.floorPlanDataTemples.seatCateories);
			$scope.floorPlanDataTemples.seatCateories = JSON.parse($scope.floorPlanDataTemples.seatCateories);
		} catch (e) {
			// TODO: handle exception
		}
		
				
		$scope.floorPlanDataTemples.numOfCol = $scope.floorPlanDataTemples.seaTPlanData.seatRows[0].seatColumns.length-2;
		$scope.floorPlanDataTemples.numOfRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows.length;
	} 

	
	
	$scope.removeColumn = function(index,seatcol,flag){
		
		console.log(index,"seatcol.....",seatcol);
		
		$.each($scope.floorPlanDataTemples.seaTPlanData.seatRows,function(key,value){
			console.log(key,"....",value);
			$.each(value.seatColumns,function(keyinner,valueinner){
				console.log(keyinner,"....",valueinner);
				if(keyinner == index){
					valueinner.columnRemoved = flag;
				}
			});
		});
		seatcol.columnRemoved = flag;
		return false;
		
		
		
	}
	
	$scope.delteAllColumn = function(index,seatcol,flag){
		console.log(index);
		
		$.each($scope.floorPlanDataTemples.seaTPlanData.seatRows,function(key,value){
			console.log(key,"....",value);
			$.each(value.seatColumns,function(keyinner,valueinner){
				console.log(keyinner,"....",valueinner);
				if(keyinner == index){
					
//					console.log();
					$scope.floorPlanDataTemples.seaTPlanData.seatRows[key].seatColumns.splice(index,1)
				}
			});
		});
		$scope.floorPlanDataTemples.seaTPlanDataFirstRow.seatRows[0].seatColumns.splice(index,1);
		
	}
	
	
	$scope.removeRow = function(seatRow,flag) {
		console.log("seatcol......",seatRow);
		for(var i=0;i<seatRow.length;i++){
			if(i==0 || i==seatRow.length-1){
				continue;
			}else{
				seatRow[i].columnRemoved = flag;
			}
			
		}
	}
	
	
	$scope.deleteRow = function(seatRow) {
//		console.log("seatcol......",$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].indexOf(seatRow))
		console.log(seatRow,"....",$scope.floorPlanDataTemples.seaTPlanData);
		var indexofSeatRow = $scope.floorPlanDataTemples.seaTPlanData.seatRows.indexOf(seatRow);
		console.log(indexofSeatRow);
		$scope.floorPlanDataTemples.seaTPlanData.seatRows.splice(indexofSeatRow,1);
		
//		$scope.servicesData.seatPlannerServicesData.formData["seaTPlanData"].splice(index,1);
		
		$scope.refreshView();
		return false;
	};



	

	$scope.removeCell = function(seatcol,flag) {
		seatcol.columnRemoved = flag;
	}

	/**
	 * Done upto here
	 */
	
	$scope.getTemplateData = function(serviceMaptempletId,serviceMapName,index) {
		var seatPlanMapBean = {};
		$scope.cuurentTemplateIndex = index;
		$scope.cuurentTemplateName = serviceMapName;
		seatPlanMapBean["serviceId"] = $scope.serviceId;
		seatPlanMapBean["userId"] = $rootScope.userinfo.user_id;
		
		seatPlanMapBean["seatPlanMapid"] = serviceMaptempletId;
		Data.post('seatPlanMap/getSeatPlanData', seatPlanMapBean).then(function (result) {
			console.log("results...",result);
			if(result.status == 200){
				$scope.floorPlanDataTemples = result.floorPlanDataTemples;
//				if($rootScope.isEmpty($scope.floorPlanDataTemples))
			}
		});
	} 
	
	
	
	$scope.backTolistDataData = function() {
		$scope.floorPlanDataTemples = {};
		$scope.addTemplatesClick = false;
		$scope.hideTemplatesCleck = false;
	}
	$scope.saveFloorPlanSessionData = function() {
		$scope.floorPlanSessionData["floorPlanDataTemples"] = $scope.floorPlanDataTemples;
		$scope.floorPlanSessionData["selectedDatesString"] = [];
			$.each($scope.floorPlanSessionData.selectedDates,function(key,value){
				$scope.floorPlanSessionData["selectedDatesString"].push($rootScope.getDateFromEpoheWithsomeChanges(value));
			});
		var dataTosend = {
				"floorPlanSessionData":$scope.floorPlanSessionData
		};
		
		dataTosend["timeZone"] = $rootScope.clientTimeZone;
		console.log(dataTosend);
//		return false;
		Data.post('FloorPlanSession/updateFloorPlanSessionData',dataTosend).then(function (result) {
			console.log(result);
			if(result.status == 200){
				Notification.success("Data Saved Successfully");
				$scope.showmapViewClick =false;
				$scope.tabClick('mannageSession');
				modalInstance.close();
			}else{
				
			}
		});
	}
	
	$scope.saveFloorPlanShedule = function(floorPlanSessionData) {
		console.log(floorPlanSessionData);
		var dataTosend = {};
		dataTosend["floorPlanSessionData"]=floorPlanSessionData;
		dataTosend["timeZone"] = $rootScope.clientTimeZone;
		Data.post('FloorPlanSession/updateFloorPlanSessionScheduleData',dataTosend).then(function (result) {
			console.log(result);
			if(result.status == 200){
				Notification.success("Data Saved Successfully");
				$scope.tabClick('mannageSession');
			}else{
				
			}
		});
	}
	
	
	$scope.closeModel = function(){
		modalInstance.close();
	};
	$scope.saveFloorPlanMapData = function() {
		var seatPlanMapBean = {};
		
		seatPlanMapBean["serviceId"] = $scope.serviceId;
		seatPlanMapBean["userId"] = $rootScope.userinfo.user_id;
		seatPlanMapBean["serviceMapName"] = $scope.cuurentTemplateName;
		seatPlanMapBean["floorPlanDataTemples"] = {};
		seatPlanMapBean.floorPlanDataTemples = $scope.floorPlanDataTemples;
		
		
		
		
		Data.post('seatPlanMap/saveSeatPlanData', seatPlanMapBean).then(function (result) {
			if(result.status == 200){
				console.log(result);
				$scope.floorPlanDataTemples = result.floorPlanDataTemples;
				var serviceMapTemplat = {};
				var flag  = false;
				serviceMapTemplat["serviceMapName"] = $scope.cuurentTemplateName;
				serviceMapTemplat["serviceMaptempletId"] = result.floorPlanDataTemples.idString;
				
				
				if($scope.servicesData.seatPlannerServicesData["formData"]["serviceMapTemplatList"].lenght ==0){
					console.log("here in 1st condition");
					$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapTemplatList"].push(serviceMapTemplat);
					
				}else{
					console.log("here in else ");
					$.each($scope.servicesData.seatPlannerServicesData["formData"]["serviceMapTemplatList"],function(keu,value){
						if(value.serviceMaptempletId == result.floorPlanDataTemples.idString){
							console.log("here in 2nd condition");
							flag = true;
							return false;
						}
					});
				}
				console.log(flag);
				if(!flag){
					$scope.servicesData.seatPlannerServicesData["formData"]["serviceMapTemplatList"].push(serviceMapTemplat);
				}else{
					$scope.servicesData.seatPlannerServicesData["formData"]
					["serviceMapTemplatList"][$scope.cuurentTemplateIndex].serviceMapName = $scope.cuurentTemplateName;
				}
				console.log($scope.servicesData.seatPlannerServicesData);
				console.log($scope.servicesData.seatPlannerServicesData.formData.serviceMapSessionsList);
//				return flag;
				var dataTosendseatPlannerServicesData={};
				dataTosendseatPlannerServicesData = angular.toJson($scope.servicesData.seatPlannerServicesData);
				dataTosendseatPlannerServicesData = JSON.parse(dataTosendseatPlannerServicesData);
				try {
					$.each(dataTosendseatPlannerServicesData.formData.serviceMapSessionsList,
							function(key,value){
						
						delete value.floorPlanDataTemples;
						delete value.floorPlanRecurciveSessionData;
						console.log(value);
					});
				} catch (e) {
					// TODO: handle exception
				}
				$scope.saveValue(dataTosendseatPlannerServicesData);
				$scope.floorPlanDataTemples = {};
				$scope.addTemplatesClick = false;
				$scope.hideTemplatesCleck = false;
			}
		});
		
	};
	
	
	
	
	/**
	 * canvas code start here
	 * 
	 */
	$scope.canvasWidth = 400;
	$scope.canvasHeight = 300;
		
	$scope.showCanvas = function() {
		 console.log($('#layoutcontainerTable').outerHeight());
		 console.log($('#layoutcontainerTable').outerWidth());
		 
		 $scope.canvasWidth = $('#layoutcontainerTable').outerWidth();
		 $scope.canvasHeight = $('#layoutcontainerTable').outerHeight();
		 $("#canvasContainer").show();
		 init2(false);
	};	

	$scope.deleteBox =function(){
		console.log($scope.mySel);
		console.log(boxes2);
		if($scope.mySel != null)
		boxes2.splice(boxes2.indexOf($scope.mySel),1);
		
		console.log(boxes2);
		init2(false);
	}

	// holds all our boxes
	var boxes2 = []; 

	// New, holds the 8 tiny boxes that will be our selection handles
	// the selection handles will be in this order:
	// 0  1  2
	// 3     4
	// 5  6  7
	var selectionHandles = [];

	// Hold canvas information
	var canvas;
	var ctx;
	var WIDTH;
	var HEIGHT;
	var INTERVAL = 20;  // how often, in milliseconds, we check to see if a redraw is needed

	var isDrag = false;
	var isResizeDrag = false;
	var expectResize = -1; // New, will save the # of the selection handle if the mouse is over one.
	var mx, my; // mouse coordinates

	 // when set to true, the canvas will redraw everything
	 // invalidate() just sets this to false right now
	 // we want to call invalidate() whenever we make a change
	var canvasValid = false;

	// The node (if any) being selected.
	// If in the future we want to select multiple objects, this will get turned into an array
	$scope.mySel = null;

	// The selection color and width. Right now we have a red selection with a small width
	var mySelColor = '#CC0000';
	var mySelWidth = 2;
	var mySelBoxColor = 'darkred'; // New for selection boxes
	var mySelBoxSize = 6;

	// we use a fake canvas to draw individual shapes for selection testing
	var ghostcanvas;
	var gctx; // fake canvas context

	// since we can drag from anywhere in a node
	// instead of just its x/y corner, we need to save
	// the offset of the mouse when we start dragging.
	var offsetx, offsety;

	// Padding and border style widths for mouse offsets
	var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;




	// Box object to hold data
	function Box2() {
	  this.x = 0;
	  this.y = 0;
	  this.w = 1; // default width and height?
	  this.h = 1;
	  this.fill = '#444444';
	}

	// New methods on the Box class
	Box2.prototype = {
	  // we used to have a solo draw function
	  // but now each box is responsible for its own drawing
	  // mainDraw() will call this with the normal canvas
	  // myDown will call this with the ghost canvas with 'black'
	  draw: function(context, optionalColor) {
	      if (context === gctx) {
	        context.fillStyle = 'black'; // always want black for the ghost canvas
	      } else {
	        context.fillStyle = this.fill;
	      }
	      
	      // We can skip the drawing of elements that have moved off the screen:
	      if (this.x > WIDTH || this.y > HEIGHT) return; 
	      if (this.x + this.w < 0 || this.y + this.h < 0) return;
	      
	      context.fillRect(this.x,this.y,this.w,this.h);
	      
	    // draw selection
	    // this is a stroke along the box and also 8 new selection handles
	    if ($scope.mySel === this) {
	      context.strokeStyle = mySelColor;
	      context.lineWidth = mySelWidth;
	      context.strokeRect(this.x,this.y,this.w,this.h);
//	      context.strokeStyle = "black";
	      context.font="20px Georgia";
	      context.textAlign="center"; 
	      context.textBaseline = "middle";
	      context.fillStyle = "#000000";
	      context.fillText("Canvas Rocks",this.x+(this.w/2),this.y+(this.h/2));
	      // draw the boxes
	      context.strokeStyle = mySelColor;
	      var half = mySelBoxSize / 2;
	      
	      // 0  1  2
	      // 3     4
	      // 5  6  7
	      
	      // top left, middle, right
	      selectionHandles[0].x = this.x-half;
	      selectionHandles[0].y = this.y-half;
	      
	      selectionHandles[1].x = this.x+this.w/2-half;
	      selectionHandles[1].y = this.y-half;
	      
	      selectionHandles[2].x = this.x+this.w-half;
	      selectionHandles[2].y = this.y-half;
	      
	      //middle left
	      selectionHandles[3].x = this.x-half;
	      selectionHandles[3].y = this.y+this.h/2-half;
	      
	      //middle right
	      selectionHandles[4].x = this.x+this.w-half;
	      selectionHandles[4].y = this.y+this.h/2-half;
	      
	      //bottom left, middle, right
	      selectionHandles[6].x = this.x+this.w/2-half;
	      selectionHandles[6].y = this.y+this.h-half;
	      
	      selectionHandles[5].x = this.x-half;
	      selectionHandles[5].y = this.y+this.h-half;
	      
	      selectionHandles[7].x = this.x+this.w-half;
	      selectionHandles[7].y = this.y+this.h-half;

	      
	      context.fillStyle = mySelBoxColor;
	      for (var i = 0; i < 8; i ++) {
	        var cur = selectionHandles[i];
	        context.fillRect(cur.x, cur.y, mySelBoxSize, mySelBoxSize);
	        
	      }
	    }
	    
	  } // end draw

	}

	//Initialize a new Box, add it, and invalidate the canvas
	function addRect(x, y, w, h, fill,flag) {
	  var rect = new Box2;
	  rect.x = x;
	  rect.y = y;
	  rect.w = w
	  rect.h = h;
	  rect.fill = fill;
	  if(flag)
	  boxes2.push(rect);
	  invalidate();
	}

	// initialize our canvas, add a ghost canvas, set draw loop
	// then add everything we want to intially exist on the canvas
	function init2(flag) {
		
		try {

			  canvas = document.getElementById('canvas2');
			  HEIGHT = canvas.height;
			  WIDTH = canvas.width;
			  ctx = canvas.getContext('2d');
			  ghostcanvas = document.createElement('canvas');
			  ghostcanvas.height = HEIGHT;
			  ghostcanvas.width = WIDTH;
			  gctx = ghostcanvas.getContext('2d');
			  
			  //fixes a problem where double clicking causes text to get selected on the canvas
			  canvas.onselectstart = function () { return false; }
			  
			  // fixes mouse co-ordinate problems when there's a border or padding
			  // see getMouse for more detail
			  if (document.defaultView && document.defaultView.getComputedStyle) {
			    stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
			    stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
			    styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
			    styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
			  }
			  
			  // make mainDraw() fire every INTERVAL milliseconds
			  setInterval(mainDraw, INTERVAL);
			  
			  // set our events. Up and down are for dragging,
			  // double click is for making new boxes
			  canvas.onmousedown = myDown;
			  canvas.onmouseup = myUp;
			  canvas.ondblclick = myDblClick;
			  canvas.onmousemove = myMove;
			  
			  // set up the selection handle boxes
			  for (var i = 0; i < 8; i ++) {
			    var rect = new Box2;
			    selectionHandles.push(rect);
			  }
			  
			  // add custom initialization here:
			  
			  if(flag){
				  // add a large green rectangle
				  addRect(260, 70, 60, 65, 'rgba(0,205,0,0.7)',flag);
				  
				  // add a green-blue rectangle
				  addRect(240, 120, 40, 40, 'rgba(2,165,165,0.7)',flag);  
				  
				  // add a smaller purple rectangle
				  addRect(45, 60, 25, 25, 'rgba(150,150,250,0.7)',flag);
			  }else{

				  console.log(boxes2)
//				addRect(x, y, w, h, fill) 
				for (var i = 0; i < boxes2.length; i++) {
					console.log(boxes2[i]);
					addRect(boxes2[i].x, boxes2[i].y, boxes2[i].w, boxes2[i].h, boxes2[i].fill,flag);
				}
			  }
			 
			
		} catch (e) {
			// TODO: handle exception
		}
		
	}


	//wipes the canvas context
	function clear(c) {
	  c.clearRect(0, 0, WIDTH, HEIGHT);
	}

	// Main draw loop.
	// While draw is called as often as the INTERVAL variable demands,
	// It only ever does something if the canvas gets invalidated by our code
	function mainDraw() {
	  if (canvasValid == false) {
	    clear(ctx);
	    
	    // Add stuff you want drawn in the background all the time here
	    
	    // draw all boxes
	    var l = boxes2.length;
	    for (var i = 0; i < l; i++) {
	      boxes2[i].draw(ctx); // we used to call drawshape, but now each box draws itself
	    }
	    
	    // Add stuff you want drawn on top all the time here
	    
	    canvasValid = true;
	  }
	}

	// Happens when the mouse is moving inside the canvas
	function myMove(e){
	  if (isDrag) {
	    getMouse(e);
	    
	    $scope.mySel.x = mx - offsetx;
	    $scope.mySel.y = my - offsety;   
	    
	    // something is changing position so we better invalidate the canvas!
	    invalidate();
	  } else if (isResizeDrag) {
	    // time ro resize!
	    var oldx = $scope.mySel.x;
	    var oldy = $scope.mySel.y;
	    
	    // 0  1  2
	    // 3     4
	    // 5  6  7
	    switch (expectResize) {
	      case 0:
	        $scope.mySel.x = mx;
	        $scope.mySel.y = my;
	        $scope.mySel.w += oldx - mx;
	        $scope.mySel.h += oldy - my;
	        break;
	      case 1:
	        $scope.mySel.y = my;
	        $scope.mySel.h += oldy - my;
	        break;
	      case 2:
	        $scope.mySel.y = my;
	        $scope.mySel.w = mx - oldx;
	        $scope.mySel.h += oldy - my;
	        break;
	      case 3:
	        $scope.mySel.x = mx;
	        $scope.mySel.w += oldx - mx;
	        break;
	      case 4:
	        $scope.mySel.w = mx - oldx;
	        break;
	      case 5:
	        $scope.mySel.x = mx;
	        $scope.mySel.w += oldx - mx;
	        $scope.mySel.h = my - oldy;
	        break;
	      case 6:
	        $scope.mySel.h = my - oldy;
	        break;
	      case 7:
	        $scope.mySel.w = mx - oldx;
	        $scope.mySel.h = my - oldy;
	        break;
	    }
	    
	    invalidate();
	  }
	  
	  getMouse(e);
	  // if there's a selection see if we grabbed one of the selection handles
	  if ($scope.mySel !== null && !isResizeDrag) {
	    for (var i = 0; i < 8; i++) {
	      // 0  1  2
	      // 3     4
	      // 5  6  7
	      
	      var cur = selectionHandles[i];
	      
	      // we dont need to use the ghost context because
	      // selection handles will always be rectangles
	      if (mx >= cur.x && mx <= cur.x + mySelBoxSize &&
	          my >= cur.y && my <= cur.y + mySelBoxSize) {
	        // we found one!
	        expectResize = i;
	        invalidate();
	        
	        switch (i) {
	          case 0:
	            this.style.cursor='nw-resize';
	            break;
	          case 1:
	            this.style.cursor='n-resize';
	            break;
	          case 2:
	            this.style.cursor='ne-resize';
	            break;
	          case 3:
	            this.style.cursor='w-resize';
	            break;
	          case 4:
	            this.style.cursor='e-resize';
	            break;
	          case 5:
	            this.style.cursor='sw-resize';
	            break;
	          case 6:
	            this.style.cursor='s-resize';
	            break;
	          case 7:
	            this.style.cursor='se-resize';
	            break;
	        }
	        return;
	      }
	      
	    }
	    // not over a selection box, return to normal
	    isResizeDrag = false;
	    expectResize = -1;
	    this.style.cursor='auto';
	  }
	  
	}

	// Happens when the mouse is clicked in the canvas
	function myDown(e){
	  getMouse(e);
	  
	  //we are over a selection box
	  if (expectResize !== -1) {
	    isResizeDrag = true;
	    return;
	  }
	  
	  clear(gctx);
	  var l = boxes2.length;
	  for (var i = l-1; i >= 0; i--) {
	    // draw shape onto ghost context
	    boxes2[i].draw(gctx, 'black');
	    
	    // get image data at the mouse x,y pixel
	    var imageData = gctx.getImageData(mx, my, 1, 1);
	    var index = (mx + my * imageData.width) * 4;
	    
	    // if the mouse pixel exists, select and break
	    if (imageData.data[3] > 0) {
	      $scope.mySel = boxes2[i];
	      offsetx = mx - $scope.mySel.x;
	      offsety = my - $scope.mySel.y;
	      $scope.mySel.x = mx - offsetx;
	      $scope.mySel.y = my - offsety;
	      isDrag = true;
	      
	      invalidate();
	      clear(gctx);
	      console.log($scope.mySel);
	      console.log(boxes2.indexOf($scope.mySel));
	      return;
	    }
	    
	  }
	  // havent returned means we have selected nothing
	  $scope.mySel = null;
	  // clear the ghost canvas for next time
	  clear(gctx);
	  // invalidate because we might need the selection border to disappear
	  invalidate();
	}

	function myUp(){
	  isDrag = false;
	  isResizeDrag = false;
	  expectResize = -1;
	}

	// adds a new node
	function myDblClick(e) {
	  getMouse(e);
	  // for this method width and height determine the starting X and Y, too.
	  // so I left them as vars in case someone wanted to make them args for something and copy this code
	  var width = 50;
	  var height = 50;
	  addRect(mx - (width / 2), my - (height / 2), width, height, 'rgba(220,205,65,0.7)',true);
	}


	function invalidate() {
	  canvasValid = false;
	}

	// Sets mx,my to the mouse position relative to the canvas
	// unfortunately this can be tricky, we have to worry about padding and borders
	function getMouse(e) {
	      var element = canvas, offsetX = 0, offsetY = 0;

	      if (element.offsetParent) {
	        do {
	          offsetX += element.offsetLeft;
	          offsetY += element.offsetTop;
	        } while ((element = element.offsetParent));
	      }

	      // Add padding and border style widths to offset
	      offsetX += stylePaddingLeft;
	      offsetY += stylePaddingTop;

	      offsetX += styleBorderLeft;
	      offsetY += styleBorderTop;

	      mx = e.pageX - offsetX;
	      my = e.pageY - offsetY
	}

	// If you dont want to use <body onLoad='init()'>
	// You could uncomment this init() reference and place the script reference inside the body tag
	//init();
	window.init2 = init2;


	init2(true);

	
});

app.directive('fileUpload', function () {
    return {
    	restrict:'A',
    	require: "?ngModel",
        scope: true,
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
            	  
            	var files = event.target.files;
            	
            	console.log("here",event.target.files,"........",scope.$parent,"...");
            	
                /*for (var i = 0; i < files.length; i++) {
                    scope.$emit("fileSelected", {
                        file: files[i]
                    });
                    
                    
                }*/
            	
            	
            	scope.$parent.fileUploadMasg ="";
        		 var myfile = event.target.files[0].name;
        		 var imageRegex = /([^\s]+(?=\.(jpg|jpeg|png|gif|bmp))\.\2)/gm;
        		 
        		 if(myfile !=""){
        			 console.log( myfile);
        			 try{
        				 myfile = myfile.split(' ').join('_'); 
        			 }catch (e) {
        				// TODO: handle exception
        				 console.log(e);
        				 
        			}
        			 
        			 if(!myfile.toLowerCase().match(imageRegex)){
        				 console.log("please select the proper formate File");
//        				 appScope.fileUploadMasg = "";
        				 scope.$parent.fileUploadMasg = "please select the proper formate File";
//        				 console.log("please select the proper formate File",$scope.fileUploadMasg);
        				 
//        				 alert("please select the proper formate File");
//        				 $scope.showImageMasge("please select the proper formate File");
        				 
        				 
        				 /*
        			    
        			     $('#imageGalleryFile').val("");
        			     $("#imageUploadFormSubmit").click(); */
        			 }else{
        				 
        				 console.log("File Uploading ...");
        				 
        				 scope.$parent.showImageMasge("File Uploading ...");
//        				 $scope.fileUploadMasg = "File Uploading ...";
        				 $("#imageUploadFormSubmit").click(); 
        			 }
        		 }else{
//        			 return false;
        		 }
        		 scope.$apply();
            });
            
            scope.$watch('fileUploadMasg', function(){
            	console.log("here..");
            	
            })
        }
    };
});
app.directive('jqdatepicker55', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            $(element).datetimepicker({datepicker:false,format:'h:i A',formatTime:'h:i A',scrollInput:false,step:10,
            	onSelectDate:function(dp,input){
//    			    console.log($input.val());
    			    
            		
            		
                    scope.$apply();
    			    
                    console.log(scope);
                   
                    
                    
    			  }
    	})
        }
    };
    
    
});
app.directive('jqdatepickereventdate', function() {
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
app.controller('ModalInstanceCtrl', 
		function($scope,HttpCodes, $rootScope,
				$uibModalInstance,$cookies, $location, Data,Notification,$routeParams,$log,parentScope){ 

//	  $scope.$parent = parentScope;
	  $scope.parentscope =  parentScope;
	  $scope.parentscope.showMulitdatePicker = false;
	  $scope.parentscope.showmapViewClick = false;
//	 console.log($scope);
//	 angular.merge($scope,parentScope)
	 
});

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
//            	console.log(scope.gPlace);
            	scope.$apply(function() {
                	
                    model.$setViewValue(element.val());  
                    scope.getLatLngFromAddress(element.val());
                });
            });
        }
    };
});

