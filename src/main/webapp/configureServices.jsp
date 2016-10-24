<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="resources/bootstrap/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="css/newForm.css"/>
<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet"
	href="resources/bootstrap/css/bootstrap-theme.min.css" />
</head>
<body>
<div id='main'>
	<div id = 'configureServices'>
		<p ><h2 style="padding-left:5%;"> Configure Services </h2></p>
		<div   >
		<div >
			<form  id = 'service'>
				<div class='row col-md-offset-1'>
				<p class='h3 col-md-offset-3' > <u>	<strong>Srvices Avialable</strong></u></p>
					<div id = 'appointment' class = 'col-md-6'>
						<p ><label id='lblAppointment' class='h4'><b>Appointment Scheduling </b></label></p>
						<input type = 'checkbox' name="appointment" id='chkApp'><label> Turn on Appointment Service</label><br>
						<div id='appointmentChild' class='hidden'>
							<label >Display Name : </label><input type='text' name='displayName' >
						</div>
					</div>	
					
					
					<div id = 'gallery' class = 'col-md-6'>
						<p ><label id='lblGallery' class='h4'><b>Gallery </b></label></p>
						<input type = 'checkbox' name="gallery"  id='chkGallery'><label>Turn on Gallery Service</label><br>
						<div id='galleryChild' class='hidden'>
							<label >Display Name : </label><input type='text' name='displayName' >
						</div>
					</div>
				</div>
				<div style="height: 40px; float: none;"></div>
				<div class='row col-md-offset-1'>
					<div id = 'location' class = 'col-md-6'>
						<p ><label id='lblLocation' class='h4'><b>Location</b></label></p>
						<input type = 'checkbox' name="location"  id='chkLocation'><label> Location Sharing </label><br>
						<div id='locationChild' class='hidden'>
							<label >Display Name : </label><input type='text' name='displayName' >
						</div>
					</div>
					
					
					<div id = 'form' class = 'col-md-6'>
						<p ><label id='lblForm' class='h4'><b>Form </b></label></p>
						<input type = 'checkbox' name="form" id='chkform'><label> Feedback Form </label><br>
						<div id='formChild' class='hidden'>
							<label >Display Name : </label><input type='text' name='displayName' ><br>
							<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >Preview Default Form</button>
							<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >Build Custom Form</button>
							
						</div>
					</div>
				</div>
				<br><br>
				<button type='submit' >submit </button>
			</form>
		</div>
		</div>
	
	</div>
	
	
	<div id = 'currentServies'>
	</div>
	
	<!--Custom Form dialog box -->
	<div class="modal fade bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div id='newForm' class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
	      </div>
	      <div id='newFormBody' class="modal-body">
	        <div id='newFormContent' class='col-md-9'>
	        	
	        </div>
	        <div id='elementPannel' class='col-md-3'>
	        <Label  > Label </Label><br>
	        <Label > Button</Label>
	        </div>
	        
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- Custom Form dialog box -->

	<!--Default Form dialog box -->
	<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div id='newForm' class="modal-dialog " role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">FEEDBACK FORM </h4>
	      </div>
	      <div id='newFormModalBody' class="modal-body">
	        <div id='newFormModalContent' class='col-md-9'>
	        	<form id='defaultForm' action"">
	        	
	        	
	        	
	        	</form>
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div>
	  </div>
	</div>
	<!-- Default Form dialog box -->
	

</div>

<script type="text/javascript">

		$(document).ready(function(){
		
			$('#chkApp').on('change', function(e){
				console.log(this.value);
				if(this.checked){
					$('#appointmentChild').attr('class','show');
				
				}
				else{
					$('#appointmentChild').attr('class','hidden');
				}
			});
			
			$('#chkGallery').on('change', function(e){
				console.log(this.value);
				if(this.checked){
					$('#galleryChild').attr('class','show');
				
				}
				else{
					$('#galleryChild').attr('class','hidden');
				}
			});
			
			$('#chkLocation').on('change', function(e){
				console.log(this.value);
				if(this.checked){
					$('#locationChild').attr('class','show');
				
				}
				else{
					$('#locationChild').attr('class','hidden');
				}
			});
			
			$('#chkform').on('change', function(e){
				console.log(this.value);
				if(this.checked){
					$('#formChild').attr('class','show');
				
				}
				else{
					$('#formChild').attr('class','hidden');
				}
			});
			
		});

	$('#service').on('submit',function(e){
		e.preventDefault();
		var x = $('#service').serializeArray();
		var z=JSON.stringify(x);
		console.log("==x=="+x);
		console.log("==x=="+z);
		
		var objarr = [];
		
		
		for(i=0;i<x.length;i++){
			console.log("name : "+$.type(x[i].name));
			if(x[i].name != "displayName"){
				
			var obj = {'module':x[i].name, 'displayName':x[i+1].value,'formDataModule':'' };
			objarr.push(obj);
			i=i+1;
			}
		}
		console.log(objarr);
		var serv = {
				"services":objarr
		};
		
		var ss= {
			'service':serv
		};
		console.log("single : "+JSON.stringify(objarr));
		console.log("Double : "+JSON.stringify(JSON.stringify(objarr)));
		
		
	  	 jQuery.ajax({
	          url: 'app/setServices?service='+JSON.stringify(objarr),
	          type: "GET",
	         
	          success: function(result) {
	 	     	console.log("success");
	          }
		}); 
	  	
		
	});
	
	function update(){
		var x = $('#service').serialize();
		console.log("==x=="+x);
		var y = $('input:checked').val();
		console.log('==y='+y);
	}

</script>

</body>
</html>