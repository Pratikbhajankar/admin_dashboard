app.controller('UserProfileInformation', function($scope, $rootScope, $cookies, $location, Data,$http,HttpCodes) {
	
	$scope.userInformation = {};
	$scope.userInformation.user_id = 0; 
	$scope.userInformation.speciality = "";
	$scope.isBussnessSelect=false;
	$scope.isDoctorSelect = false;
	$scope.orgName = "";
	$scope.gPlace = "";
	$scope.bussineses = {};
	$scope.userInformation.userTimeZone = $rootScope.userTimeZone;
	$http.get('./templates/services/countries.json').success(function(data) {
	      $scope.countries = data;
	      $scope.getCountryCode();
	      
    });
	
	Data.get("bussines/getBussiness").then(function (results) {
		if(results.status == HttpCodes.OK){
			$scope.bussineses = results.userBussinesses;
		}
	});
	Data.get("bussiness/getConstructionBussiness").then(function (results) {
		if(!$rootScope.isEmpty(results)){
			$scope.constrnBussType = results;
		}
	});
	$scope.getCountryCode = function(){
	 var lat = 21.1461904; 
	 var long = 79.1346593;
	 
	 object = $rootScope.getCurrnetLatLong();
	 $scope.objectLatLong = object;
	 /*if (navigator.geolocation) {
//	      navigator.geolocation.getCurrentPosition(showPosition);
			navigator.geolocation.getCurrentPosition(showPosition);
	  } else { 
	     console.log("Geolocation is not supported by this browser.");
	  }
		function showPosition(position) {
			console.log("position  ",position);
			console.log("Latitude: " + position.coords.latitude + 
		    "<br>Longitude: " + position.coords.longitude);
			lat = position.coords.longitude;
			long = position.coords.longitude;
		}*/
		
		$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+object.lat+','+object.long+'&sensor=false').success(function(data) {
			console.log(data);
			if(data.status == "OK"){
				$scope.userInformation.country = data.results[data.results.length -1].address_components[0].long_name;
				console.log(data.results[data.results.length -1].address_components[0].long_name);
				
			}
		});
	}
	$scope.getLatLngFromAddress = function (address){

//		console.log(address);
		  var geocoder = new google.maps.Geocoder();

		  geocoder.geocode( { 'address': address}, function(results, status) {
			  
//			  console.log(results);
		    if (status == google.maps.GeocoderStatus.OK) {
		    	
		      console.log(results[0].geometry.location.lat());
		      console.log(results[0].geometry.location.lng());
		      $scope.userInformation["lattitude"] = results[0].geometry.location.lat();
		      $scope.userInformation["longitude"] = results[0].geometry.location.lng();
		    } else {
		    	
		    	$scope.userInformation["lattitude"] = $scope.objectLatLong.lat;
			    $scope.userInformation["longitude"] = $scope.objectLatLong.long;
		      console.log("Geocode was not successful for the following reason: " + status);
		    }
		  });
		}
//	console.log("here.........................");
	$scope.addInformationForm = function(){
		
		console.log("here....",$scope.userInformation,$rootScope.userinfo);
		
		
		$scope.userInformation.user_id = $rootScope.userinfo.user_id;
		
		
		if($scope.moreInformation.$valid){
			console.log("here.... yes validate",$scope.userInformation);
			var datatoSend = {};
			datatoSend["userProfile"] = $scope.userInformation;
			
			Data.post('user/addProfile', datatoSend).then(function (result) {
				
				console.log(result);
				
				if(result.status == 200){
					
					Data.get('user/getUserProfileInfromation/'+$rootScope.userinfo.user_id).then(function (result) {
						
						console.log(result);
						
						if(result.status == 200){
							
							$rootScope.userProfile = result.userProfile;
							$cookies.putObject('userProfile', $rootScope.userProfile, {'path': '/'}); 
							
						}
						
						$location.path("/serviceList");
					});
					
					
				}else{
					
				}

			});
			
		}
		return false;
	};
	$scope.bussinessSelectChange = function(data){
//		console.log(data);
		
		if(data == 1){
			$scope.isBussnessSelect=true;
			$scope.isDoctorSelect = true;
			$scope.orgName = "Clinic Name";
		}else if(data == 3){
			$scope.isBussnessSelect=true;
			$scope.isDoctorSelect = false;
			$scope.orgName = "School Name";
		}else if(data == 2){
			$scope.isBussnessSelect=true;
			$scope.isDoctorSelect = false;
			$scope.orgName = "Gym Name";
		}else{
			$scope.isBussnessSelect=true;
			$scope.orgName = "Company name"
			$scope.isDoctorSelect = false;
		}
	}
});
app.directive('googleplace1', function() {
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