<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title> Registeration</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div align="center">
     <p align="center"><h2> Register new Service Provider </h2></p>
</div>
<br>
<br>
	<div id = 'spregform' class='regform' align="center">
		<form action="">
			<table align="center" cellpadding = "10">
				<tr><td>			
		     	<label >First Name : </label></td><td><input type='text' id='fname'></td>
		     	</tr>
		     	<tr><td>
			     <label >Last Name : </label></td><td><input type='text' id='lname'></td>
			     </tr>
		     	<tr><td>
			     <label >Email-id : </label></td><td><input type='text' id='email'></td>
			     </tr>
		     	<tr><td>
			     <label >Password : </label></td><td><input type="password" id='pass'></td>
			     </tr>
		     	<tr><td>
			     <label >Retype Password : </label></td><td><input type='text' id='rpass'></td>
			     </tr>
		     	<tr><td>
			     <label >Phone no. : </label></td><td><input type='text' id='phone'></td>
			     </tr>
		     	<tr><td>
			     <label >Address : </label></td><td><input type='text' id='address'></td>
			     </tr>
		     	<tr><td>
			     <label >Bussiness Type : </label></td><td><select name="btype" id="btype">
			     							<option value="DOCTOR">DOCTOR</option>
			     							<option value="GYM">GYM</option>
			     							<option value="SCHOOL">SCHOOL</option></select>	
			     </td>
			     </tr>
		 <!--  	<tr><td>Services </td>
 
								<td>
								
								<input type="checkbox" name="service_appointment" value="APPOINTMENT" />
								Appointment
								
								<input type="checkbox" name="service_location" value="LOCATION" />
								LOCATION
								
								<input type="checkbox" name="service_forms" value="FORMS" />
								FORMS
								
								<input type="checkbox" name="service_gallery" value="GALLERY" />
								GALLERY
								<br /></td>
			     </tr>  -->    
		     	<tr><td>
			     <input type='submit' value="SUBMIT" ></td><td><button>Cancel</button></td>
			     </tr>
		     	
			</table>
		</form>
	</div>
</body>
</html>