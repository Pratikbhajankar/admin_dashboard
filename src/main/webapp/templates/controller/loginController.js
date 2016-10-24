app.controller('LoginController', function($scope, $rootScope, $cookies, $location, Data) {
 $rootScope.userinfo = {};
 $scope.user = {};
 

 $scope.login = function(loginData){
	 var data  = {"user":{}};
	
	 var headers = {"headers":loginData};
	 
	 Data.postWithHeader("user/auth","",headers).then(function (result) {
		 console.log(result.status);
		 if(result.status == 200){
			 
			 console.log(result);
			 $scope.user.uerrorMasg = "Login Success";
			 $rootScope.userinfo.user_id = result.user.user_id; 
			 $rootScope.userinfo.userLName = result.user.userLName;
			 $rootScope.userinfo.userFname = result.user.userFname;
			 $rootScope.userinfo.emailId = result.user.emailId;
			 $rootScope.userinfo.authToken = result.user.authToken;
			 $cookies.putObject('userinfo', $rootScope.userinfo, {'path': '/'}); 
			 
			 Data.get('user/getUserProfileInfromation/'+$rootScope.userinfo.user_id).then(function (result) {
					
					console.log(result);
					
					if(result.status == 200){
						
						 $rootScope.userProfile = result.userProfile;
						 $cookies.putObject('userProfile', $rootScope.userProfile, {'path': '/'}); 
						 console.log($cookies.get('userProfile'));
					}
					else{
						
					}
					$location.path("/serviceDashBoard");
				});
			 
			
			 
		 }else if(result.status == 401){
			 $scope.user.uerrorMasg = "Sorry Invalid user name or password";
		 }
		 
	 });
 };
 
 
 $scope.loginUser =function(){
	
	 if($scope.loginUserForm.$valid){
		 var loginData = {};
		 loginData["Email"] = $scope.user.usename;
		 loginData["Pass"] = $scope.user.password;
		 loginData["Content-Type"] = "application/json";
		 
		 $scope.login(loginData);
	 }
	 
	 
	 return false;
 };
 

});