<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet"
	href="../common/css/bootstrap.min.css">
<link rel="stylesheet" href="../common/css/bootstrapValidator.min.css">

<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="../common/js/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="../common/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../common/js/bootstrapValidator.js"></script>

<script type="text/javascript">
	$(function() {
		// Generate a simple captcha
		function randomNumber(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		;
		$('#captchaOperation').html(
				[ randomNumber(1, 100), '+', randomNumber(1, 200), '=' ].join(' '));

    $('#defaultForm').bootstrapValidator({
												//        live: 'disabled',
							message : 'This value is not valid',
							feedbackIcons : {
								valid : 'glyphicon glyphicon-ok',
								invalid : 'glyphicon glyphicon-remove',
								validating : 'glyphicon glyphicon-refresh'
							},
							fields : {
								firstName : {
									validators : {
										notEmpty : {
											message : '分公司'
										}
									}
								},
								lastName : {
									validators : {
										notEmpty : {
											message : 'The last name is required and cannot be empty'
										}
									}
								},
								username : {
									message : 'The username is not valid',
									validators : {
										notEmpty : {
											message : 'The username is required and cannot be empty'
										},
										stringLength : {
											min : 6,
											max : 30,
											message : 'The username must be more than 6 and less than 30 characters long'
										},
										regexp : {
											regexp : /^[a-zA-Z0-9_\.]+$/,
											message : 'The username can only consist of alphabetical, number, dot and underscore'
										},
										remote : {
											url : 'remote.php',
											message : 'The username is not available'
										},
										different : {
											field : 'password',
											message : 'The username and password cannot be the same as each other'
										}
									}
								},
								email : {
									validators : {
										emailAddress : {
											message : 'The input is not a valid email address'
										}
									}
								},
								password : {
									validators : {
										notEmpty : {
											message : 'The password is required and cannot be empty'
										},
										identical : {
											field : 'confirmPassword',
											message : 'The password and its confirm are not the same'
										},
										different : {
											field : 'username',
											message : 'The password cannot be the same as username'
										}
									}
								},
								confirmPassword : {
									validators : {
										notEmpty : {
											message : 'The confirm password is required and cannot be empty'
										},
										identical : {
											field : 'password',
											message : 'The password and its confirm are not the same'
										},
										different : {
											field : 'username',
											message : 'The password cannot be the same as username'
										}
									}
								},
								birthday : {
									validators : {
										date : {
											format : 'YYYY/MM/DD',
											message : 'The birthday is not valid'
										}
									}
								},
								gender : {
									validators : {
										notEmpty : {
											message : 'The gender is required'
										}
									}
								},
								'languages[]' : {
									validators : {
										notEmpty : {
											message : 'Please specify at least one language you can speak'
										}
									}
								},
								'programs[]' : {
									validators : {
										choice : {
											min : 2,
											max : 4,
											message : 'Please choose 2 - 4 programming languages you are good at'
										}
									}
								},
								captcha : {
									validators : {
										callback : {
											message : 'Wrong answer',
											callback : function(value,
													validator) {
												var items = $(
														'#captchaOperation')
														.html().split(' '), sum = parseInt(items[0])
														+ parseInt(items[2]);
												return value == sum;
											}
										}
									}
								}
							}
						});

		// Validate the form manually
		$('#validateBtn').click(function() {
			$('#defaultForm').bootstrapValidator('validate');
			alert(131)
		});

		$('#resetBtn').click(function() {
			$('#defaultForm').data('bootstrapValidator').resetForm(true);
		});
	});
</script>
</head>
<body>
	<div class="container">
		<div class="row">
			<section>
			<div class="col-lg-8 col-lg-offset-2">
				<div class="page-header">
					<h2>注 册</h2>
				</div>

				<form id="defaultForm" method="post" class="form-horizontal"
					action="target.php">
					<div class="form-group">
						<label class="col-lg-3 control-label">全名</label>
						<div class="col-lg-4">
							<input type="text" class="form-control" name="firstName"
								placeholder="First name" />
						</div>
						<div class="col-lg-4">
							<input type="text" class="form-control" name="lastName"
								placeholder="Last name" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">用户名</label>
						<div class="col-lg-5">
							<input type="text" class="form-control" name="username" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">邮箱</label>
						<div class="col-lg-5">
							<input type="text" class="form-control" name="email" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">密码</label>
						<div class="col-lg-5">
							<input type="password" class="form-control" name="password" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">重置密码</label>
						<div class="col-lg-5">
							<input type="password" class="form-control"
								name="confirmPassword" />
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">Gender</label>
						<div class="col-lg-5">
							<div class="radio">
								<label> <input type="radio" name="gender" value="male" />
									男性
								</label>
							</div>
							<div class="radio">
								<label> <input type="radio" name="gender" value="female" />
									女性
								</label>
							</div>
							<div class="radio">
								<label> <input type="radio" name="gender" value="other" />
									保密
								</label>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">生日</label>
						<div class="col-lg-5">
							<input type="text" class="form-control" name="birthday" />
							(YYYY/MM/DD)
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">语言</label>
						<div class="col-lg-5">
							<div class="checkbox">
								<label> <input type="checkbox" name="languages[]"
									value="english" /> English
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="languages[]"
									value="french" /> French
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="languages[]"
									value="german" /> German
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="languages[]"
									value="russian" /> Russian
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="languages[]"
									value="other" /> 其他
								</label>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label">编程语言</label>
						<div class="col-lg-5">
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="net" /> .Net
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="java" /> Java
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="c" /> C/C++
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="php" /> PHP
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="perl" /> Perl
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="ruby" /> Ruby
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="python" /> Python
								</label>
							</div>
							<div class="checkbox">
								<label> <input type="checkbox" name="programs[]"
									value="javascript" /> Javascript
								</label>
							</div>
						</div>
					</div>

					<div class="form-group">
						<label class="col-lg-3 control-label" id="captchaOperation"></label>
						<div class="col-lg-2">
							<input type="text" class="form-control" name="captcha" />
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-9 col-lg-offset-3">
							<button type="submit" class="btn btn-primary" name="signup"
								value="Sign up">提交</button>
							<button type="button" class="btn btn-info" id="validateBtn">自动验证</button>
							<button type="button" class="btn btn-info" id="resetBtn">重置表单</button>
						</div>
					</div>
				</form>
			</div>
			</section>
			<!-- :form -->
		</div>
	</div>
</body>
</html>