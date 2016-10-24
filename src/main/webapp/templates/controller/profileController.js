app.controller('profileController', function($scope, $rootScope, $cookies, $location, Data,$http) {
	$scope.userProfile = {};
	$scope.userProfile.userTimeZone = $rootScope.userTimeZone;
	console.log("In undefind..........",$rootScope.userProfile);
	
	if(!angular.isUndefined($rootScope.userProfile)){
		$scope.userProfile = $rootScope.userProfile;
		
		console.log($scope.userProfile);
		
		$scope.initial ="";
		$scope.countries = $rootScope.countries;
		$scope.isEditAllow = true;
		
		
		
		if($scope.userProfile.userBussiness.bussinessTypeId == 1){
			$scope.initial ="Dr.";
		}
		
		if($scope.userProfile.userBussiness.bussinessTypeId == 4){
			Data.get("bussiness/getConstructionBussiness").then(function (results) {
				if(!$rootScope.isEmpty(results)){
					$scope.constrnBussType = results;
				}
			});
		}
		
	}
	else{
		
		console.log("In undefind");
		$location.path('/userProfileInformation');
	}
	/*Data.get('user/getUserProfileInfromation/'+$rootScope.userinfo.user_id).then(function (result) {
		
		console.log(result);
		$scope.initial ="";
		$scope.countries = $rootScope.countries;
		$scope.isEditAllow = true;
		if(result.status == 200){
			
			
			
			$scope.userProfile = result.userProfile;
			
			
			if($scope.userProfile.userProfileImageId !=""){
				$rootScope.userProfileUrl ="./rest/v1/user/file/getImage?fileId="+$scope.userProfile.userProfileImageId;
			}
			if($scope.userProfile.userBussiness.bussinessTypeId == 1){
				$scope.initial ="Dr.";
			}
			
		}
		
	});*/
	var oldDoc = "";
	$scope.editForm = function(document){
		$scope.isEditAllow = false;
		
		return false;
	}
	$scope.saveprofileFormData = function(){
		
		
		if($scope.profileForm.$valid){
			console.log("yes here....",$scope);
			$scope.userProfile["user_id"] = $rootScope.userinfo.user_id;
//			$scope.userProfile.validData = $scope.profileForm.$valid;
			
			var datatoSend = {};
			datatoSend["userProfile"] = $scope.userProfile;
			
			Data.post('user/updateProfile', datatoSend).then(function (result) {
				
				console.log(result);
				
				if(result.status == 200){
//					$location.path("/serviceList");
					$rootScope.userProfile = $scope.userProfile;
					$rootScope.userProfileUrl ="./rest/v1/user/file/getImage?fileId="+$scope.userProfile.userProfileImageId;
					$cookies.putObject('userProfile', $rootScope.userProfile, {'path': '/'}); 
					$scope.isEditAllow = true;
					
				}else{
					
				}

			});
			
		}else{
			console.log("No here....",$scope);
		}
		return false;
	};
	
	$scope.complete = function(content) {
	      console.log(content); // process content
	      if(content.status == 200){
	    	 
	    	 $scope.userProfile.userProfileImageId = content.fileStoredId;
   			 
//	    	  $scope.fileUploadMasg = "File uploaded";
   			  $scope.saveprofileFormData();
	    	  $scope.showImageMasge("File uploaded");
	    	  $("#file-input").val("");
	    	 
	      }else{
	    	  $scope.showImageMasge("There was a error while uploading file");
//	    	  $scope.fileUploadMasg = "There was a error while uploading file";
	    	  $("#file-input").val("");
	    	 
	      }
	      
	 };
	 
	 $scope.showImageMasge = function(massege){
		 $scope.fileUploadMasg  = massege;
	 };
	
});
app.directive('file-Upload', function () {
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
app.directive('googleplace2', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());       
                    scope.getLatLngFromAddress(element.val());
                });
            });
        }
    };
});