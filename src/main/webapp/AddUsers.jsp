<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>Users</title>
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet"
		href="resources/bootstrap/css/bootstrap-theme.min.css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<style type="text/css">
	</style>
</head>
<body>

	<div id="status" align="center">&nbsp;</div>
	<h3 align="center">Add Users</h3>
	<div class="addUserFormDiv">
		<form id = "userForm" role="form" method="post" action="app/addUser">
				<div class="form-group">
					<label for="email">Email address:</label> <input type="email"
						class="form-control" id="email" name="user.email" value="" required="true" />
				</div>
				<div class="form-group">
					<label for="fname">First Name:</label> <input type="text"
						class="form-control" id="fname" name="user.fName" value="" required="true" />
				</div>
				<div class="form-group">
					<label for="lname">Last Name:</label> <input type="text"
						class="form-control" id="lname" name="user.lName" value="" required="true" />
				</div>
				<div class="form-group">
					<label for="pass">Password:</label> <input type="password"
						class="form-control" id="pass" name="user.pass" required="true" />
				</div>
				<div class="form-group">
					<label for="confirm_pass">Confirm Password:</label> <input type="password"
						class="form-control" id="confirm_pass" name="confirm_pass" required="true" />
				</div>
				<div class="form-group">
					<label for="userType">Bussiness Type:</label>
					<select name="user.bussiness_type" class="form-control" required="true">
						<option value="1">DOCTOR</option>
						<option value="2">GYM</option>
						<option value="3">SCHOOL</option>
						
					</select>
				</div>
				<div class="form-group" align="center">
					<button type="submit" class="btn btn-primary" onclick="validatePassword" >Create</button>
				</div>
			</form>
		</div>
		<br />
		<br />
		
		<script type="text/javascript">
			
			var password = document.getElementById("pass")
			  , confirm_password = document.getElementById("confirm_pass");
	
			function validatePassword(){
				console.log('in validate password');
			  if(password.value != confirm_password.value) {
			    confirm_password.setCustomValidity("Passwords Don't Match");
			  } else {
			    confirm_password.setCustomValidity('');
			  }
			}
	
			password.onchange = validatePassword;
			confirm_password.onkeyup = validatePassword;
		
			
			$(document).ready(function(){
				
				<%
					String status = request.getParameter("status");
				
					if(status == null)
						status = "";
					
					if(status.equals("success")){
						%>
						$("#status").html("<b style='color: green;'>User Added successfully</b>");
						
						<%
					}else if(status.equals("error")){
						%>
						$("#status").html("<b style='color: red;'>An error occured while adding user!</b>");
						<%
					}else if(status.equals("email")){
						%>
						$("#status").html("<b style='color: red;'>An email Id already exist!</b>");
						<%
					}
					
					%>
					hideStatus();
					<%
					
				%>
				
			});
			
			function hideStatus(){
				
				setTimeout(function(){ $("#status").html("&nbsp;"); }, 5000);
			}
			
			
			function createUser(){
				var user1 = $('#userForm').serialize();
				console.log('in create user');
				console.log(user1);
				var data = {
						"user" : user1
				}	
				$.ajax({
				    url: 'app/addUser',
				    type: "POST",
				    data: data,
				    processData: false,
				    contentType: "application/json; charset=UTF-8",
				    complete: 'index.jsp'
				});
			}
			
		</script>
</body>
</html>