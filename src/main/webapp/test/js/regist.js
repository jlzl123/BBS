var regist={
		formData:[]
}

$(document).ready(function(){
//	regist.formValidate();
	regist.addUser();
	regist.validateUsername();
	$("#form").bootstrapValidator({
		message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
		fields:{
			user:{
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
			
		}
	});
//	$("#regist").click(function(){	
//		$("#form").bootstrapValidator("validate");
//	});
})

regist.addUser=function(){
	$("#regist").click(function(){
		var bootstrapValidator=$("#form").data("bootstrapValidator");
		bootstrapValidator.validate();
		var flag=bootstrapValidator.isValid();
		var json=regist.getFormElementsVal();	
		if(flag){
			$.post("/BBS/userControl/addUser",{"json":JSON.stringify(json)},
					function(data){
				if(data=="添加用户信息异常!"){
					alert("信息不正确，请检查修改");
				}else{
					if(data){
						alert("注册成功，请登录。");
					}				
				}
			});			
		}else{
			alert("信息不正确，请检查修改");
		}
	});
}

regist.getFormElementsVal=function(){
	var username=$("#user").val();
	var pass=$("#password").val();
	var password=hex_md5(pass);
	var age=$("#age").val();
	var sex=$('input:radio:checked').val();
	var email=$("#email").val();
	var str={
			"username":username,
			"password":password,
			"age":age,
			"sex":sex,
			"email":email
	}
	return str;
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

regist.validateUsername=function(){
	$("#user").change(function(){       		
		$.get("/BBS/userControl/validateUsername",{"username":$("#user").val()},
				function(data){
			if(data=="查询用户信息异常!"){
				alert(data);
			}else{
				if(data){
					$("#errorFont").css("display","");//如果设置block的话标签位置会变化
				}else{
					$("#errorFont").css("display","none");
				}				
			}
		});
	});
}
