var regist={
		formData:[]
}

$(document).ready(function(){
	regist.formValidate();
	regist.addUser();
})

regist.addUser=function(){
	$("#regist").click(function(){	
		$("#form").bootstrapValidator("validate");
		alert(123)
	});
}

regist.formValidate=function(){
	$("#form").bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
			username:{
				validators:{
					notEmpty:{
						message:"用户名不能为空!"
					},
					stringLength:{
						min:2,
						max:10,
						message:"用户名只能在2-10个字符之间哦~"
					}
				}
			},
			email:{
				validators:{
					emailAddress:{
						message:"邮箱格式有误"
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:"密码不能为空"
					},
					stringLength:{
						min:6,
						max:20,
						message:"密码必须在6-20个字符之间~"
					},
					regexp:{
						regexp:/^[a-zA-Z0-9]+$/,
						message:"密码只能由字母、数字组成~"
					},
					different:{
						field:"username",
						message:"密码和用户名不能相同"
					}
				}
			},
			passwordConfirm:{
				validators:{
					notEmpty:{
						message:"密码不能为空"
					},
					stringLength:{
						min:6,
						max:20,
						message:"密码必须在6-20个字符之间~"
					},
					regexp:{
						regexp:/^[a-zA-Z0-9]+$/,
						message:"密码只能由字母、数字组成~"
					},
					identical:{
						field:"password",
						message:"密码不一致"
					},
					different:{
						field:"username",
						message:"密码和用户名不能相同"
					}
				}
			}
		}
	});
}
