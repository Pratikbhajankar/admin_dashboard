<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html data-ng-app="productApp">
<head>
<title data-ng-bind="$root.pageTitle + ' | MyApp'"></title>
<link rel="shortcut icon" type="image/png" href="./tslogo.png"/>
<link rel="shortcut icon" type="image/png" href="./tslogo.png"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="resources/css/main.css">

<link rel="stylesheet" href="resources/notification/angular-csp.css">
<link rel="stylesheet" href="resources/notification/angular-ui-notification.min.css">
<link rel="stylesheet" href="resources/dateTimePicker/jquery.datetimepicker.css">
<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/bootstrap/css/simple-sidebar.css">
<link rel="stylesheet" href="resources/css/registrationStyle.css">
<link rel="stylesheet" href="resources/css/siteCommanStyle.css">
<link rel="stylesheet" href="resources/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="templates/services/textAngular/textAngular.css">

</head>
<body >
	<!-- Top content -->
 <nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid" style="padding-right: 0.5px;" data-ng-controller="IndexController">
  
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
     
      <div ng-hide="$root.isUserIsLogin" class="navbar-toggle collapsed" style="float: right;" >
    	 
    	  <div class="dropdown-toggle" data-toggle="dropdown" style="cursor: pointer;"> 
    	  	
    	  	<img alt="" data-ng-src="{{$root.userProfileUrl}}" style="width: 25px;height: 14px;">
    	  </div>
		 <!--  <button class="btn btn-primary dropdown-toggle" type="button" >
		 </button> -->
		  <ul class="dropdown-menu" style="min-width: 100px;">
		    <li><a href="#/profile">Profile</a></li>
		    <li><a href="javascript:void(0);">Other</a></li>
		    <li><a href="#/Logout">Log out</a></li>
		  </ul>
	 </div>
	 <div ng-hide="$root.isUserIsLogin" class="navbar-toggle collapsed" style="float: right;min-width: 56px;color: white;" >
    	<div style="font-size: 14px;cursor: pointer;" class="dropdown-toggle" data-toggle="dropdown" >
			<i class="fa fa-bell"></i>
			<span style="position: absolute;font-size:12px;bottom: 15px;">{{$root.notificationslenght}}</span>
		</div>
		<ul class="dropdown-menu" style="min-width: 100px;right: -57px !important;left: initial;max-height: 300px;overflow-y: auto;">
		    <li data-ng-show="$root.notifications.length == 0">
		    	<a href="javascript:void(0);" data-ng-click="showNotificationInformation(notification)">
		    		No Notification Available..
		    	</a>
		    </li>
		    <li data-ng-repeat="notification in $root.notifications">
		    	<a href="javascript:void(0);" data-ng-click="showNotificationInformation(notification)">{{notification.msg}}</a>
		    </li>
		    
		 </ul>
     </div>
      
      
      <span><a class="navbar-brand" href="#/" style="margin-left: 0px;">Project name</a></span>
      
    </div>
    <div id="navbar" class="collapse navbar-collapse" style="float: left;">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#contact">Message</a></li>
      </ul>
      
    </div><!--/.nav-collapse -->
   
    <div id="navbarList" data-ng-hide="$root.isUserIsLogin" class="dropdown navbar-collapse" style="float: right;min-width: 56px;">
    	  
    	  <div class="dropdown-toggle" data-toggle="dropdown" style="float: left;width: 100%;cursor: pointer;" align="right"> 
    	  	<img alt="" data-ng-src="{{$root.userProfileUrl}}" style="width: 55px;height: 50px;">
    	  </div>
		 <!--  <button class="btn btn-primary dropdown-toggle" type="button" >
		 </button> -->
		  <ul class="dropdown-menu" style="min-width: 100px;left: inherit;right: 0;">
		    <li><a href="#/profile">Profile</a></li>
		    <li><a href="javascript:void(0);">Other</a></li>
		    <li><a href="#/Logout">Log out</a></li>
		  </ul>
	</div>
	<div id="navbarListNotification" data-ng-hide="$root.isUserIsLogin" class="dropdown navbar-collapse" style="float: right;min-width: 56px;color: white;">
		<div style="padding-top: 10px;font-size: 30px;padding-left: 10px;cursor: pointer;" class="dropdown-toggle" data-toggle="dropdown" >
			<i class="fa fa-bell"></i>
			<span style="position: absolute;font-size:12px;">{{$root.notificationslenght}}</span>
		</div>
		<ul class="dropdown-menu" style="min-width: 100px;right: -57px !important;left: initial;max-height: 300px;overflow-y: auto;">
		    <li data-ng-show="$root.notifications.length == 0">
		    	<a href="javascript:void(0);" data-ng-click="showNotificationInformation(notification)">
		    		No Notification Available..
		    	</a>
		    </li>
		    <li data-ng-repeat="notification in $root.notifications">
		    	<a href="javascript:void(0);" data-ng-click="showNotificationInformation(notification)">{{notification.msg}}</a>
		    </li>
		    
		 </ul>
	</div>
  </div>
</nav>
<div spiiner></div>
	<!-- {{$root.isUserIsLogin}} -->
	<div  data-ng-view >
	<!-- This the view for AngularJS -->
		
	</div>
	

<script src="resources/js/jquery-2.1.4.min.js"></script>
<script src="resources/js/jquery-ui.min.js"></script>
<script src="resources/angular-1.4.4/angular.min.js"></script>
<script src="resources/bootstrap/js/bootstrap.min.js"></script>


<script src="resources/dateTimePicker/jquery.datetimepicker.js"></script>
<script src="templates/ui-tinymce/angular-ui/tinymce.js"></script>
<script src="resources/angular-1.4.4/angular-route.js"></script>
<script src="resources/angular-1.4.4/angular-cookies.min.js"></script>
<script src="resources/angular-1.4.4/angular-sanitize.min.js"></script>
<script src="resources/angular-1.4.4/angular-animate.js"></script>
<script src="resources/angular-1.4.4/angular-touch.js"></script>
<script src="resources/js/angular-ui.js"></script>

<script src="templates/services/spinnerCoustomModule.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_fBvCnEx3CavSS4lLUk9jX21OeFXaThM&libraries=places"></script>
<script src="resources/js/ng-upload.min.js"></script>
<!-- <script src="//rawgit.com/allenhwkim/angularjs-google-maps/master/build/scripts/ng-map.min.js"></script> -->
<!-- <script src="resources/js/google_map.js"></script> -->


<script src="resources/js/jstz-1.0.4.min.js"></script>
<script src="resources/notification/angular-ui-notification.js"></script>
<script src="resources/MultipleDatePicker/gm.datepickerMultiSelect.js"></script>


    
<!-- <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.6/textAngular-rangy.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.6/textAngular-sanitize.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.4.6/textAngular.min.js'></script> -->

<script src="templates/ui-tinymce/tinymce/tinymce.js"></script>
<script src="resources/js/angular-strap.min.js"></script>
<script src="resources/js/productApp.js"></script>
<script src="templates/services/dragdrop.js"></script>
<script src="templates/services/DataFactory.js"></script>

<script src="templates/services/angular-http-status.js"></script>
<script src="templates/controller/indexController.js"></script>
<script src="templates/controller/loginController.js"></script>
<script src="templates/controller/logOutController.js"></script>
<script src="templates/controller/registerController.js"></script>
<script src="templates/controller/userContorllerInformation.js"></script>
<script src="templates/controller/selectServiceDashBoard.js"></script>
<script src="templates/controller/servicesSettingDashBoard.js"></script>
<script src="templates/controller/appointmentIntraction.js"></script>
<script src="templates/controller/formBuilderReport.js"></script>
<script src="templates/controller/listOfServiceController.js"></script>
<script src="templates/controller/create.js"></script>
<script src="templates/controller/profileController.js"></script>
<script src="templates/controller/jobinformationcontroller.js"></script>
<script src="templates/controller/jobApplication.js"></script>

<script src="templates/controller/seatPlanServiceReport.js"></script>
<script src="templates/controller/messagesController.js"></script>
<script src="templates/controller/seatPlanDataMapController.js"></script>
<script src="templates/controller/view.js"></script>
<script src="templates/services/form-service.js"></script>
<script src="templates/directives/form-directive.js"></script>
<script src="templates/directives/field-directive.js"></script>
<script src="resources/js/ui-bootstrap-tpls-0.14.3.js"></script>
</body>
</html>