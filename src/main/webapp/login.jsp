<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login</title>

<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet"
	href="resources/bootstrap/css/bootstrap-theme.min.css" />
<script type="text/javascript" src="js/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>
	<div>
    	 <p align="right"> <a href = 'AddUsers.jsp'>REGISTER</a> </p>
	</div>
	<br /> <br />
	<div id="status" align="center">&nbsp;</div>
	<h3 align="center">System Login</h3>

	<div class="loginDiv">
		<form role="form" method="post" action="app/login">
			<div class="form-group">
				<label for="email">Email address:</label> <input type="text"
					class="form-control" id="email" name="user.email" />
			</div>
			<div class="form-group">
				<label for="pass">Password:</label> <input type="password"
					class="form-control" id="pass" name="user.pass" />
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
				<button type="submit" class="btn btn-primary">Login</button>
			</div>
		</form>
	</div>
	
	<script type="text/javascript">
	
		$(document).ready(function(){
			
			<%
				String status = request.getParameter("login");
				if(status == null)
					status = "";
							
				if(status.equals("fail")){
					%>
					$("#status").html("<b style='color: red;'>Invalid login!</b>");
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
	</script>
</body>
</html>
