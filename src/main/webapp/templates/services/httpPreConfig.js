app.factory('httpPreConfig', ['$http', '$rootScope', function($http, $rootScope) {
    $http.defaults.transformRequest.push(function (data) {
        $rootScope.$broadcast('httpCallStarted');
        return data;
    });
    $http.defaults.transformResponse.push(function(data){ 
        $rootScope.$broadcast('httpCallStopped');
        return data;
    })
    return $http;
}]);
