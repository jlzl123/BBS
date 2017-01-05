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
				<form id="form" class="form-horizontal">
					<div class="form-group">
						<label class="col-lg-3 control-label">用户名</label>
						<div class="col-lg-5">
							<input type="text" class="form-control" name="user" id="user"/>
							<font id="errorFont" style="display: none" color="red">用户名已存在</font>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">邮箱</label>
						<div class="col-lg-5">
							<input type="text" class="form-control" name="email" id="email"/>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">密码</label>
						<div class="col-lg-5">
							<input type="password" class="form-control" name="password" id="password"/>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">重置密码</label>
						<div class="col-lg-5">
							<input type="password" class="form-control"
								name="confirmPassword" id="confirmPassword"/>
						</div>
					</div>
					<div class="form-group">
						<label for="sex" class="col-lg-3 control-label">性别</label>
						<div class="col-lg-5">
							<label> <input type="radio" name="sex" id="sex"
								value="男" checked> 男
							</label> <label> <input type="radio" name="sex"
								id="optionsRadios2" value="女"> 女
							</label>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">年龄</label>
						<div class="col-lg-5">
							<input type="text" class="form-control"
								name="age" id="age"/>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-9 col-lg-offset-3">
							<button id="regist" type="button" class="btn btn-default">注册</button>
							<button type="reset" class="btn btn-default">重置</button>
						</div>
					</div>

				</form>

			</div>
		</div>
	</div>

</body>
</html>