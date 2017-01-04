<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册</title>
<%@include file="head.jsp"%>
<script type="text/javascript" src="../test/js/regist.js"></script>
</head>
<body>

	<div class="panel panel-default">
		<div class="panel-body">
			<div class="panel-body">
				<ol class="breadcrumb">
					<li><a href="/">首页</a></li>
					<li><a href="/n/1/">用户注册</a></li>
				</ol>
				<form id="form">
					<div class="form-group">
						<label for="username">用户名</label> <input type="text"
							name="username" class="form-control" id="username"
							placeholder="必填项" >
					</div>
					<div class="form-group">
						<label for="email">电子邮件</label> <input type="email"
							name="email" class="form-control" id="email" placeholder="必填项">
					</div>
					<div class="form-group">
						<label for="password">密码</label> <input type="password"
							name="password" class="form-control" id="password"
							placeholder="必填项">
					</div>
					<div class="form-group">
						<label for="passwordConfirm">重新输入一遍密码</label> <input
							type="password" name="passwordConfirm" class="form-control"
							id="passwordConfirm" placeholder="必填项">
					</div>
					<div class="form-group">
						<label for="sex">性别</label>
						<div class="radio">
							<label> <input type="radio" name="sex"
								id="sex" value="option1" checked> 男
							</label> <label> <input type="radio" name="sex"
								id="optionsRadios2" value="option2"> 女
							</label>
						</div>
					</div>

					<button id="regist" type="submit" class="btn btn-default">注册</button>
					<button type="reset" class="btn btn-default">重置</button>

				</form>

			</div>
		</div>
	</div>

</body>
</html>