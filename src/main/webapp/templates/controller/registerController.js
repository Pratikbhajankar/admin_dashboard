app.controller('RegisterController', function($scope, $rootScope, $cookies, $location, Data) {
	
	$scope.error = {};
	$scope.error.emailError = "";
	$scope.user = {};
	$scope.user.deviceType = 2;
	$scope.user.user_id = 0; 
	$scope.isUserRegister = false;
	$rootScope.userinfo = {};
	$scope.register =function(){
		
		
		
		if($scope.user.password != $scope.user.confPassword){
			$scope.registrationForm.$valid = false;
		}
		console.log($scope.registrationForm.$valid);
		
		if($scope.registrationForm.$valid){
			console.log($scope);
			
			
			/**
			 * Registration save will call here
			 */
			var datatoSend = {};
			datatoSend["user"] = $scope.user;
			delete datatoSend.user.confPassword;
			console.log(datatoSend);
			Data.post('user/register', datatoSend).then(function (result) {
				console.log(result);
				
					if(result.status == 200){
						console.log("here in 200..",result.status);
						$rootScope.userinfo.user_id = result.user.user_id; 
						$rootScope.userinfo.userLName = result.user.userLName;
						$rootScope.userinfo.userFname = result.user.userFname;
						$rootScope.userinfo.emailId = result.user.emailId;
						$rootScope.userinfo.authToken = result.user.authToken;
						$cookies.putObject('userinfo', $rootScope.userinfo, {'path': '/'}); 
						
						$location.path("/userProfileInformation");
					}else if(result.status == 409){
						console.log("here in 409..",result.status);
						$scope.error.emailError = result.message;
					}
					//
				
			});
//			Data.post("",)
//			$scope.isUserRegister = true;
			
		}
		
		return false;
	};
	

});