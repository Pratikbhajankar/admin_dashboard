app.controller('LogOutController', function($scope, $rootScope, $cookies, $location, Data) {
	   $cookies.putObject('userinfo',undefined,{'path': '/'});
	   $cookies.putObject('userProfile',undefined,{'path': '/'});
//	   $rootScope.referrer = current;
//	   alert("here");
       $location.path('/');
});