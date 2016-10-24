<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>

<script type="text/javascript" src="resources/bootstrap/js/bootstrap.min.js"></script>

	<link rel="stylesheet" href="css/newForm.css"/>	
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap-theme.min.css" />

  <script type="text/javascript" src="resources/jquery-timepicker-master/lib/bootstrap-datepicker.js"></script>
  <link rel="stylesheet" type="text/css" href="resources/jquery-timepicker-master/lib/bootstrap-datepicker.css" />

  <script type="text/javascript" src="resources/jquery-timepicker-master/lib/site.js"></script>
  <link rel="stylesheet" type="text/css" href="resources/jquery-timepicker-master/lib/site.css" />
  <script type="text/javascript" src="resources/jquery-timepicker-master/jquery.timepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="resources/jquery-timepicker-master/jquery.timepicker.css" />

	<script type="text/javascript" src="resources/jquery-toggle-checkbox/js/bootstrap-checkbox.min.js"></script>

</head>
<body>
		<%@include file="menu.jsp" %>
		
			<div class='row col-md-offset-1'>
				<p class='h3 col-md-offset-3' > <u>	<strong>Srvices Avialable</strong></u></p>
					<div id = 'appointment' class = 'col-md-6'>
						<p ><label id='lblAppointment' class='h4'><b>Appointment Scheduling </b></label></p>
						
						<!-- <input type="checkbox" id='appointmentCheck' name='appointCheck'><br><br> -->
						<form id='appointmentService' >
						<div id='appointmentChild' class='disabled'>
							<label >Display Name : </label><input type='text' name='displayName' > <br/><br/>
							
							<label >Working Days : </label>
							          <div >
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday1'  value='MON' ><label class = "label label-primary">MON</label> <br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday2' value='TUE'><label class = "label label-primary" >TUE</label><br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday3' value='WED'><label class = "label label-primary" >WED</label><br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday4' value='THU'><label class = "label label-primary" >THU</label><br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday5' value='FRI'><label class = "label label-primary" >FRI</label><br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday6' value='SAT'><label class = "label label-primary" >SAT</label><br>
							          <input type = 'checkbox' class = "check workingDayCheck"  id='workingday7' value='SUN'><label class = "label label-primary" >SUN</label><br>
							          </div>
							 <br/><br/>
							 <div>
							<label>  Timing : </label> <input id="timeformatExample1" name='startTime' type="text" class="time start" >
							       To <input id="timeformatExample2" type="text" name='endTime' class="time ui-timepicker-input" autocomplete="off">
							       <br><br>
							  </div>
					    	<button  type='submit' class='btn btn-primary'> SUBMIT </button> 		
						</div>
					</form>
					</div>	
				</div>

</body>
<script type="text/javascript">
$(document).ready(function(){
	/*  $('#timeformatExample1').timepicker();
	$('#timeformatExample2').timepicker();  */
	
/*	$('#appointmentCheck').checkboxpicker({
		style: false,
		defaultClass: 'btn-default',
		disabledCursor: 'not-allowed',
		offClass: 'btn-danger',
		onClass: 'btn-success',
		offLabel: 'No',
		onLabel: 'Yes',
		offTitle: false,
		onTitle: false,
		warningMessage: 'Please do not use Bootstrap-checkbox element in label element.'
	}); */
	
	
	function getWorkinDays(){
		 var arr = [];
         $('input[type="checkbox"]:checked.workingDayCheck').each(function(){
            arr.push($(this).val());
         });
         return arr;
	}
	
	$('#appointmentService').on('submit',function(e){
		e.preventDefault();
		var x = $('#appointmentService').serializeArray();
		var z=JSON.stringify(x);
		console.log("==x=="+x);
		console.log("==x=="+z);
		
		var workingDay = getWorkinDays();
		console.log(workingDay);
		
		
		var objarr = [];
		
		
		/* for(i=0;i<x.length;i++){
			console.log("name : "+x[i].name);
			if(x[i].name != "displayName"){
		 */		
		 	var serviceData = {'workingDays':workingDay, 'startTime':x[1].value, 'endTime':x[2].value};
		 
			var obj = {'module':'Appointment Schedulling',  'displayName':x[0].value, 'serviceData':serviceData, 'formData':'', 'serviceType':1};
			$.ajax({
                url: 'app/setServices?service='+JSON.stringify(obj),
                dataType: 'json',
                type: 'get',
                
                
                success: function(data){
                	console.log(data);
                },
                error:function(data){
                	console.log(data);
                }
                
            });
			
			/* jQuery.ajax({
		          url: 'app/setServices?service='+JSON.stringify(obj),
		          type: "POST",
		         
		          success: function(result) {
		 	     	console.log("success");
		          }
			}); 
 */
			
			
			
			
			/* 			objarr.push(obj);
			i=i+1;
			}
 */
			console.log(obj);
		//}
		
		var serv = {
//				"services":objarr
		};
	
	});
});
	</script>


</html>