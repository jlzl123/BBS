var regist={
		formData:[]
}

$(document).ready(function(){
	regist.validate();
	regist.validateUsername();
	regist.addUser();
})

regist.getFormElementsVal=function(){
	var username=$("#user").val();
	var pass=$("#pass").val();
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

regist.addUser=function(){
	$("#submit").click(function(){
		var flag=$("#form").valid()
		var json=regist.getFormElementsVal();	
		if(flag){
			$.post("/BBS/userControl/addUser",{"json":JSON.stringify(json)},
					function(data){
				if(data=="添加用户信息异常!"){
					$.messager.alert("错误","信息不正确，请检查修改","error");
				}else{
					if(data){
						$.messager.alert("提示","注册成功，请登录。","info");
					}				
				}
			});			
		}else{
			$.messager.alert("错误","信息不正确，请检查修改","error");
		}
	});
	
}

regist.validate=function(){
	$("#form").validate({
		rules:{
			user:{
				required:true,
				minlength:2
			},
			pass:{
				required:true,
				minlength:6
			},
			repassword:{
				required:true,
				minlength:6,
				equalTo:"#pass"
			},
			age:{
				required:true,
				range:[0,150] 
			},        			
			email:{
				required:true,
				email:true
			}
		},
		messages:{
			username:{
				required:"请输入您的用户名",
				minlength:"用户名至少由两个字母组成"
			},
			password:{
				required: "请输入密码",
				minlength:"密码长度不能小于 6 个字母",
			},
			repassword:{
				required:"请输入确认密码",
				minlength:"密码长度不能小于 6 个字母",
				equalTo:"两次密码输入不一致"
			},
			age:{
				required:"请输入年龄",
				range:"年龄必需在0-150之间" 
			},
			email:"请输入一个正确的邮箱",        			       		
		}
	}); 
}

regist.validateUsername=function(){
	$("#user").change(function(){       		
		$.get("/BBS/userControl/validateUsername",{"username":$("#user").val()},
				function(data){
			if(data=="查询用户信息异常!"){
				$.messager.alert("错误",data,"warning");
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