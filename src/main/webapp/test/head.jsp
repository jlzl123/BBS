<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="common.jsp"%>
<script type="text/javascript">
	$(document).ready(function() {
		 var session= '<%=session.getAttribute("username")%>';
    	 var isExist=<%=request.getAttribute("isExist")%>;
    	 if(session!='null'){
    		 $("#logined").css("display","block");
		     $("#form").css("display","none");
    	 }else{
    		 if(isExist){
    			 $("#logined").css("display","block");
    		     $("#form").css("display","none");
    		 }
    	 }
		
		$("#login").click(function() {
			var pass = $("#password").val();
			var password = hex_md5(pass)//md5加密  		 
			$.post("/BBS/userControl/userLogin", {
				"username" : $("#username").val(),
				"password" : password,
				"isChecked" : $("#check").is(":checked")
			}, function(data) {
				if (data) {
					$("#form").css("display", "none");
					$("#logined").css("display", "block");
					$("#span").text($("#username").val());
					$("#tishi").css("display", "none");
				} else {
					alert("登录失败，用户名或密码错误！");
				}
			});
		});
		$("#loginOut").click(function(){
			 $.get("/BBS/userControl/userLogout",{"username":$("#span").val()},
    				 function(data){
    			        if(data){
    			        	$("#logined").css("display","none");
       				        $("#form").css("display","block");
       				        $("#span").text("null");
       				        $("#tishi").css("display", "block");
       				        alert("成功退出！");
    			        }
    		 });
		});
	})
</script>
<style type="text/css">
.panel-header, .panel-body {
	border-width: 0px;
}

.datagrid, .combo-p {
	border: solid 1px #D4D4D4;
}

.datagrid * {
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}
</style>
</head>
<body>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">校园BBS</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<form class="navbar-form navbar-right" role="form" id="form">
				<div class="form-group">
					<input id="username" type="text" placeholder="用户名"
						class="form-control">
				</div>
				<div class="form-group">
					<input id="password" type="password" placeholder="密码"
						class="form-control">
				</div>

				<input id="login" type="button" class="btn btn-success" value="登录"></input>
				<div class="checkbox">
					<label> <input id="check" type="checkbox">记住密码 <a>忘记密码</a>
					</label>
				</div>
				<button class="btn">注 册</button>
			</form>
			<div class="navbar-form navbar-right" style="display: none" id="logined">
			     <a href="#">
                   <span id="span" class="glyphicon glyphicon-user"><%=session.getAttribute("username") %></span>
                 </a>
                 <button id="loginOut" type="button" class="btn btn-default btn-sm">退出</button>
			</div>
		</div>
		<!--/.navbar-collapse -->
	</div>
	</nav>


	<!-- Main jumbotron for a primary marketing message or call to action -->
	<div class="jumbotron">
		<div class="container">
			<h1>欢迎来到本论坛!</h1>
		</div>
	</div>

	<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="#">首页</a>
		</div>
		<div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">校园信息</a></li>
				<li><a href="/BBS/test/index.jsp">在线论坛</a></li>
				<li><a href="/BBS/test/regist.jsp">用户注册</a></li>
				<li><a href="/BBS/test/admin.jsp">后台管理</a></li>

			</ul>
		</div>
	</div>
	</nav>


	<div>
		<div class="input-group">
			<div class="input-group-btn">
				<button type="button" class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					站内搜索 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu">
					<li><a href="#">作者</a></li>
					<li><a href="#">帖子</a></li>
				</ul>
			</div>
			<!-- /btn-group -->
			<input type="text" class="form-control"><span class="input-group-btn">
				<button class="btn btn-default" type="button">搜索</button></span>
		</div>
		<!-- /input-group -->
	</div>
	<!-- /.col-lg-6 -->
    
</body>
</html>