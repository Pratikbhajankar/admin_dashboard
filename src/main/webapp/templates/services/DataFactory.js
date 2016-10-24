// Service for the HTTP get, post, put, delete requests
app.factory("Data", ['$http','$rootScope',
    function ($http,$rootScope) { // This service connects to our REST API

        var serviceBase = './rest/v1/';

        var obj = {};
        
        
      
        
        
        obj.get = function (q) {
        	$rootScope.startAjax= true;
            return $http.get(serviceBase + q).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };
        
        obj.getWithHeader = function (q,headers) {
        	$rootScope.startAjax= true;
            return $http.get(serviceBase + q,headers).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };
        
        obj.post = function (q, object) {
        	$rootScope.startAjax= true;
            return $http.post(serviceBase + q, object).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };
        
        obj.postWithHeader = function (q, object,headers) {
        	$rootScope.startAjax= true;
            return $http.post(serviceBase + q, object,headers).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };
        obj.put = function (q, object) {
        	$rootScope.startAjax= true;
            return $http.put(serviceBase + q, object).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };
        obj.delete = function (q) {
        	$rootScope.startAjax= true;
            return $http.delete(serviceBase + q).then(function (results) {
            	$rootScope.startAjax= false;
            	return results.data;
            });
        };

        return obj;
    }]);