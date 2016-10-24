//console.log = function() {}
var app = angular.module('productApp', [
    'ngRoute',
    'ngCookies',
    'ngUpload',
    'ui.bootstrap',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'mgcrea.ngStrap',
    'common.dragdrop',
    'ui-notification',
    'ngHttpStatus',
    'show.spiiner',
    'gm.datepickerMultiSelect',
    'ui.tinymce',
    'ui.bootstrap.modal'
]
);
var timezone = jstz.determine();
app.config(['$routeProvider','$locationProvider',
            function($routeProvider, $locationProvider){
	
                $routeProvider
                    .when('/register', {
                        title: 'Register',
                        templateUrl: 'templates/view/register.html',
                        controller: 'RegisterController'
                    })
                    .when('/login', {
                        title: 'login',
                        templateUrl: 'templates/view/login.html',
                        controller: 'LoginController'
                    })
                    .when('/instructions', {
                        title: 'Instructions',
                        templateUrl: 'app/partials/instruction.html',
                        controller: 'InstructionController'
                    })
                    .when('/serviceList', {
                        title: 'Select Service',
                        templateUrl: 'templates/view/ListOFServices.html',
                        controller: 'listOfServiceController'
                    })
                    .when('/serviceDashBoard', {
                        title: 'Service DashBoard',
                        templateUrl: 'templates/view/ServiceDashBoard.html',
                        controller: 'SelectServiceDhBrdController'
                    })
                    .when('/servicesSettingDashBoard/:serviceId/:serviceType/:tabToOpen', {
                        title: 'Service Setting DashBoard',
                        templateUrl: 'templates/view/ServiceDashBoard.html',
                        controller: 'servicesSettingDashBoardController'
                    })
                    .when('/servicesSettingDashBoard/:serviceId/:serviceType', {
                        title: 'Service Setting DashBoard',
                        templateUrl: 'templates/view/ServiceDashBoard.html',
                        controller: 'servicesSettingDashBoardController'
                    })
                    .when('/appointmentReport/:serviceId/:appointmentMode', {
                        title: 'Report | Appointment',
                        templateUrl: 'templates/view/appointmentIntraction.html',
                        controller: 'appointmentintractionController'
                    })
                    .when('/seatPlanReport/:serviceId/:sessionId', {
                        title: 'Report | Seat Plan',
                        templateUrl: 'templates/view/seatPlanServiceReport.html',
                        controller: 'seatPlanServiceReportController'
                    })
                    .when('/formDataReport/:serviceId', {
                        title: 'Report | Form',
                        templateUrl: 'templates/view/formBuilderReport.html',
                        controller: 'formBuilderdataView'
                    })
                    .when('/jobInformation/:jobid', {
                        title: 'Jobs | Infortmation',
                        templateUrl: 'templates/view/jobinformation.html',
                        controller: 'jobInformationController'
                    })
                    .when('/applyJobApplication/:jobid', {
                        title: 'Jobs | Apply',
                        templateUrl: 'templates/view/jobApplication.html',
                        controller: 'jobApplicationController'
                    })
                    .when('/userProfileInformation', {
                        title: 'User Information',
                        templateUrl: 'templates/view/userProfileInformation.html',
                        controller: 'UserProfileInformation'
                    })
                    .when('/profile', {
                        title: 'Profile',
                        templateUrl: 'templates/view/userProfile.html',
                        controller: 'profileController'
                    })
                    .when('/forms/:id/view', {
                        title: 'Form View',
                        templateUrl: 'templates/view/view.html',
                        controller: 'ViewCtrl'
                    })
                    .when('/Logout', {
                        title: 'Logout',
                        templateUrl: 'templates/view/index.html',
                        controller: 'LogOutController'
                    })
                    .when('/messages', {
                        title: 'messages',
                        templateUrl: 'templates/view/messagesView.html',
                        controller: 'MessagesController'
                    })
                    .when('/', {
                        title: 'index',
                        templateUrl: 'templates/view/index.html',
                        controller: 'IndexController'
                    })
                    .otherwise({
                        redirectTo : '/'
                    });

                // use the HTML5 History API
//                $locationProvider.html5Mode({
//                	  enabled: true,
//                	  requireBase: false
//                });
}]).run(function ($rootScope, $location, $cookies, $http, $locale, Data,$route) {
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
    	
    	$http.get('./templates/services/countries.json').success(function(data) {
    		 $rootScope.countries = data;
//		      $scope.getCountryCode();
		      
	    });
    	$rootScope.menu_toggle = function(event){
    		event.preventDefault();
            $("#wrapper").toggleClass("toggled");
            return false;
    	};
    	
        $rootScope.authenticated = false;
        
        
        $rootScope.userProfileUrl = "resources/img/default_profile.png";
        
        $rootScope.clientTimeZone = timezone.name();
        $rootScope.userTimeZone = timezone.name();
        
        $rootScope.isServicesShow = false;
        $rootScope.referrer = current.substr(current.indexOf('#') + 1);
        console.log($cookies.get('userinfo'));
        $rootScope.notifications = [];
        if(angular.isUndefined($cookies.get('userinfo')) !== true
        		&& $cookies.get('userinfo') !== null){
        	console.log("$cookies available");
        	console.log($cookies.get('userinfo'));
            $rootScope.userinfo = JSON.parse($cookies.get('userinfo'));
            $rootScope.isUserIsLogin = false;
//            $cookies.putObject('userinfo',undefined,{'path': '/'});
           
            console.log($cookies.get('userProfile'));
            if(angular.isUndefined($cookies.get('userProfile')) !== true && $cookies.get('userinfo') !== null){
            	 $rootScope.userProfile = JSON.parse($cookies.get('userProfile'));
            	 
            	 if(!angular.isUndefined($rootScope.userProfile)){
//             		$scope.userProfile = $rootScope.userProfile;
            		 $rootScope.userTimeZone = $rootScope.userProfile.userTimeZone;
             		
            		 if($rootScope.userProfile.userProfileImageId !=""){
             			$rootScope.userProfileUrl ="./rest/v1/user/file/getImage?fileId="+$rootScope.userProfile.userProfileImageId;
             		}
             	}
             	else{
             		
             	}
            }
            
            
            if($location.path() === '/register'){
            	
            	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
            		$location.path('/serviceDashBoard');
            	}else{
            		$rootScope.isUserIsLogin = true;
            	}
            	
            }else if($location.path() === '/login'){
            	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
            		$location.path('/serviceDashBoard');
            	}else{
            		$rootScope.isUserIsLogin = true;
            	}
            }else if($location.path() === '/'){
            	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
            		$location.path('/serviceDashBoard');
            	}else{
            		$rootScope.isUserIsLogin = true;
            	}
            }
            
           
            Data.get('notification/getNotification/'+ $rootScope.userinfo.user_id).then(function (result) {
            	console.log("notitication....",result);
            	if(result.status == 200){
            		$rootScope.notifications = result.notifications;
            		$rootScope.notificationslenght = result.notifications.length;
            	}
            });
            
        }
        else if($location.path() === '/register'){
        	
        	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
        		$location.path('/serviceDashBoard');
        	}else{
        		$rootScope.isUserIsLogin = true;
        	}
        	
        }else if($location.path() === '/login'){
        	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
        		$location.path('/serviceDashBoard');
        	}else{
        		$rootScope.isUserIsLogin = true;
        	}
        }else if($location.path() === '/'){
        	if(angular.isUndefined($cookies.get('userinfo')) !== true && $cookies.get('userinfo') !== null){
        		$location.path('/serviceDashBoard');
        	}else{
        		$rootScope.isUserIsLogin = true;
        	}
        }else{
        	console.log("redirectoring for here");
        	$rootScope.isUserIsLogin = true;
            $rootScope.referrer = current;
            $location.path('/');
        }

        
    });
    
    
    
    $rootScope.timezone = timezone.name();
    console.log("timezone..........",$rootScope.timezone);
    console.log("timezone..........",new Date().getTimezoneOffset());
//    $rootScope.timezone = "Asia/Kolkata";
    
   
    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
    	
    	console.log($route.current.title);
    	
    	$rootScope.pageTitle = $route.current.title;
    });
    
    $rootScope.formatAMPM = function(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
     }
     $rootScope.isEmpty = function(obj) {
		// Speed up calls to hasOwnProperty
		 var hasOwnProperty = Object.prototype.hasOwnProperty;
		 
	    // null and undefined are "empty"
	    if (obj == null) return true;
	
	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;
	
	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }
	
	    return true;
	 };
	 $rootScope.getCurrnetLatLong = function(){
		 var object = {};
		 var lat = 21.1461904; 
		 var long = 79.1346593;
		 if (navigator.geolocation) {
//		      navigator.geolocation.getCurrentPosition(showPosition);
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
		  }
		  object.lat = lat;
		  object.long = long;
		
		  return object;
	 };
	 
	 $rootScope.validateHhMm = function (inputField,isLastFiled,value) {
	        var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?\sg?[PA][M]$/.test(value);

	        if (isValid) {
	        	$(inputField).css("border-color","#ccc");
	            
	        } else {
	        	$(inputField).css("border-color","red");
	        }
	        console.log(isValid);
	        return isValid;
	    }
	 
	 $rootScope.getAddressFromLatLong = function(lat,lng,callback){
		 var formatted_address = "";
		 var geocoder = new google.maps.Geocoder();
		 var latlng = new google.maps.LatLng(lat, lng);
		 geocoder.geocode({ 'latLng': latlng }, function (results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
                 if (results[1]) {
                     console.log("Location: " , results[1].formatted_address);
                     
                     formatted_address =  results[1].formatted_address;
                     
                     callback(formatted_address);
                 }else{
                	 callback(formatted_address);
                	 //return formatted_address;
                	 
                 }
             }else{
            	 callback(formatted_address);
            	 //return formatted_address;
             }
            
            
        });
		console.log("return here")
	 }
	 
	 $rootScope.getDateFromEpohe =  function(date){
		 	var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			
			
			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 
			date = dd+'/'+mm+'/'+yyyy;
			console.log(date);
			return date;
	 };
	 $rootScope.getDateFromEpoheWithsomeChanges =  function(epoche){
		 	var date = new Date(epoche);
		 	var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			
			
			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 
			date = dd+'/'+mm+'/'+yyyy;
			console.log(date);
			return date;
	 };
	 $rootScope.getToday =  function(){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
			    dd='0'+dd
			} 

			if(mm<10) {
			    mm='0'+mm
			} 
			today = dd+'/'+mm+'/'+yyyy;
			
			return today;
		}
	 
	 $rootScope.timezonesList = ["ACT","AET","AGT","ART","AST","Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmara","Africa/Asmera","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Lome","Africa/Luanda","Africa/Lubumbashi","Africa/Lusaka","Africa/Malabo","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Mogadishu","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Sao_Tome","Africa/Timbuktu","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Anguilla","America/Antigua","America/Araguaina","America/Argentina/Buenos_Aires","America/Argentina/Catamarca","America/Argentina/ComodRivadavia","America/Argentina/Cordoba","America/Argentina/Jujuy","America/Argentina/La_Rioja","America/Argentina/Mendoza","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Aruba","America/Asuncion","America/Atikokan","America/Atka","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Buenos_Aires","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Catamarca","America/Cayenne","America/Cayman","America/Chicago","America/Chihuahua","America/Coral_Harbour","America/Cordoba","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Dominica","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Ensenada","America/Fort_Nelson","America/Fort_Wayne","America/Fortaleza","America/Glace_Bay","America/Godthab","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Indianapolis","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indianapolis","America/Inuvik","America/Iqaluit","America/Jamaica","America/Jujuy","America/Juneau","America/Kentucky/Louisville","America/Kentucky/Monticello","America/Knox_IN","America/Kralendijk","America/La_Paz","America/Lima","America/Los_Angeles","America/Louisville","America/Lower_Princes","America/Maceio","America/Managua","America/Manaus","America/Marigot","America/Martinique","America/Matamoros","America/Mazatlan","America/Mendoza","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Port_of_Spain","America/Porto_Acre","America/Porto_Velho","America/Puerto_Rico","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Rosario","America/Santa_Isabel","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Shiprock","America/Sitka","America/St_Barthelemy","America/St_Johns","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Tortola","America/Vancouver","America/Virgin","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/McMurdo","Antarctica/Palmer","Antarctica/Rothera","Antarctica/South_Pole","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Arctic/Longyearbyen","Asia/Aden","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Ashkhabad","Asia/Baghdad","Asia/Bahrain","Asia/Baku","Asia/Bangkok","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Calcutta","Asia/Chita","Asia/Choibalsan","Asia/Chongqing","Asia/Chungking","Asia/Colombo","Asia/Dacca","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Gaza","Asia/Harbin","Asia/Hebron","Asia/Ho_Chi_Minh","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Istanbul","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Kashgar","Asia/Kathmandu","Asia/Katmandu","Asia/Khandyga","Asia/Kolkata","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Kuwait","Asia/Macao","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Muscat","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Phnom_Penh","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qyzylorda","Asia/Rangoon","Asia/Riyadh","Asia/Saigon","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Tel_Aviv","Asia/Thimbu","Asia/Thimphu","Asia/Tokyo","Asia/Ujung_Pandang","Asia/Ulaanbaatar","Asia/Ulan_Bator","Asia/Urumqi","Asia/Ust-Nera","Asia/Vientiane","Asia/Vladivostok","Asia/Yakutsk","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faeroe","Atlantic/Faroe","Atlantic/Jan_Mayen","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/St_Helena","Atlantic/Stanley","Australia/ACT","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Canberra","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/LHI","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/NSW","Australia/North","Australia/Perth","Australia/Queensland","Australia/South","Australia/Sydney","Australia/Tasmania","Australia/Victoria","Australia/West","Australia/Yancowinna","BET","BST","Brazil/Acre","Brazil/DeNoronha","Brazil/East","Brazil/West","CAT","CET","CNT","CST","CST6CDT","CTT","Canada/Atlantic","Canada/Central","Canada/East-Saskatchewan","Canada/Eastern","Canada/Mountain","Canada/Newfoundland","Canada/Pacific","Canada/Saskatchewan","Canada/Yukon","Chile/Continental","Chile/EasterIsland","Cuba","EAT","ECT","EET","EST","EST5EDT","Egypt","Eire","Etc/GMT","Etc/GMT+0","Etc/GMT+1","Etc/GMT+10","Etc/GMT+11","Etc/GMT+12","Etc/GMT+2","Etc/GMT+3","Etc/GMT+4","Etc/GMT+5","Etc/GMT+6","Etc/GMT+7","Etc/GMT+8","Etc/GMT+9","Etc/GMT-0","Etc/GMT-1","Etc/GMT-10","Etc/GMT-11","Etc/GMT-12","Etc/GMT-13","Etc/GMT-14","Etc/GMT-2","Etc/GMT-3","Etc/GMT-4","Etc/GMT-5","Etc/GMT-6","Etc/GMT-7","Etc/GMT-8","Etc/GMT-9","Etc/GMT0","Etc/Greenwich","Etc/UCT","Etc/UTC","Etc/Universal","Etc/Zulu","Europe/Amsterdam","Europe/Andorra","Europe/Athens","Europe/Belfast","Europe/Belgrade","Europe/Berlin","Europe/Bratislava","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Busingen","Europe/Chisinau","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Guernsey","Europe/Helsinki","Europe/Isle_of_Man","Europe/Istanbul","Europe/Jersey","Europe/Kaliningrad","Europe/Kiev","Europe/Lisbon","Europe/Ljubljana","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Mariehamn","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Nicosia","Europe/Oslo","Europe/Paris","Europe/Podgorica","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/San_Marino","Europe/Sarajevo","Europe/Simferopol","Europe/Skopje","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Tiraspol","Europe/Uzhgorod","Europe/Vaduz","Europe/Vatican","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zagreb","Europe/Zaporozhye","Europe/Zurich","GB","GB-Eire","GMT","GMT0","Greenwich","HST","Hongkong","IET","IST","Iceland","Indian/Antananarivo","Indian/Chagos","Indian/Christmas","Indian/Cocos","Indian/Comoro","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Mayotte","Indian/Reunion","Iran","Israel","JST","Jamaica","Japan","Kwajalein","Libya","MET","MIT","MST","MST7MDT","Mexico/BajaNorte","Mexico/BajaSur","Mexico/General","NET","NST","NZ","NZ-CHAT","Navajo","PLT","PNT","PRC","PRT","PST","PST8PDT","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Chuuk","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Johnston","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Midway","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Pohnpei","Pacific/Ponape","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Saipan","Pacific/Samoa","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Truk","Pacific/Wake","Pacific/Wallis","Pacific/Yap","Poland","Portugal","ROK","SST","Singapore","SystemV/AST4","SystemV/AST4ADT","SystemV/CST6","SystemV/CST6CDT","SystemV/EST5","SystemV/EST5EDT","SystemV/HST10","SystemV/MST7","SystemV/MST7MDT","SystemV/PST8","SystemV/PST8PDT","SystemV/YST9","SystemV/YST9YDT","Turkey","UCT","US/Alaska","US/Aleutian","US/Arizona","US/Central","US/East-Indiana","US/Eastern","US/Hawaii","US/Indiana-Starke","US/Michigan","US/Mountain","US/Pacific","US/Pacific-New","US/Samoa","UTC","Universal","VST","W-SU","WET","Zulu"];
	 $rootScope.startAjax= false;
	 
	 $rootScope.$watch('startAjax', function( status ){
		 if(status){
			 $("#spinnerGloabal").show()
		 }else{
			 $("#spinnerGloabal").hide();
		 }
	 });
});
