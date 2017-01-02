<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="common.jsp"%>
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
			<form class="navbar-form navbar-right" role="form">
				<div class="form-group">
					<input type="text" placeholder="用户名" class="form-control">
				</div>
				<div class="form-group">
					<input type="password" placeholder="密码" class="form-control">
				</div>

				<button type="submit" class="btn btn-success">登 录</button>
				<div class="checkbox">
					<label> <input type="checkbox">记住密码 <a>忘记密码</a>
					</label>
				</div>
				<button class="btn">注 册</button>
			</form>
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
				<li><a href="#">在线论坛</a></li>
				<li><a href="#">用户注册</a></li>
				<li><a href="#">后台管理</a></li>

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
			<input type="text" class="form-control">
		</div>
		<!-- /input-group -->
	</div>
	<!-- /.col-lg-6 -->
   
</body>
</html>