<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="../../common/common.jsp"%>
<script type="text/javascript">
     $(document).ready(function(){
    	 $("#login").click(function(){
    	   var pass=$("#password").val();
    	   var password=hex_md5(pass)//md5加密  		 
    		$.post("/BBS/userControl/userLogin",{"username":$("#username").val(),"password":
    			password,"isChecked":$("#check").is(":checked")},
    			function(data){	
    				if(data){
    				     $("#loginedDiv").css("display","block");
    				     $("#loginDiv").css("display","none");
    				     $("#font").text($("#username").val());
    				}else{
    					$.messager.alert("提示","登录失败，用户名或密码错误！","error");
    				}
    			});
    	 });
    	
    	 $("#logout").click(function(){		 
    		 $.get("/BBS/userControl/userLogout",{"username":$("#username").val()},
    				 function(data){
    			        if(data){
    			        	$("#loginedDiv").css("display","none");
       				        $("#loginDiv").css("display","block");
       				        $.messager.alert("提示","成功退出！","info");
    			        }
    		 });
    	 });
    	 
    	 var session= '<%=session.getAttribute("username")%>';
    	 var isExist=<%=request.getAttribute("isExist")%>;
    	 if(session!='null'){
    		 $("#loginedDiv").css("display","block");
		     $("#loginDiv").css("display","none");
    	 }else{
    		 if(isExist){
    			 $("#loginedDiv").css("display","block");
    		     $("#loginDiv").css("display","none");
    		 }
    	 }
    	 
     })
</script> 

<style type="text/css">
#loginDiv {
	float: right;
	margin-top: 30px;
	width: 250px;
	padding-right: 200px;
}

#usernameDiv, #passwordDiv {
	padding-top: 5px;
	width: 400px;
}

#passwordDiv {
	padding-left: 8px;
}

html,body{
    width:100% 
}
.tab {
	background-color: #ADD8E6;
	width: 100%;
}
.th{
    width: 20%;
}
#loginedDiv{
    padding-top: 10px;
    display: none;
}
#mm{
    float: right;
}
</style>
</head>
<body>

		<div id="titleDiv" style="height: 100px;background-color: #FFDEAD">
			<div style="width: 60%; float: left;" align="center">
				<h1>校园BBS</h1>
			</div>
			<div id="loginDiv" align="center">
				<form id="form1">
					<div id="usernameDiv">
						<label for="username">用户名:</label> <input id="username"
							name="username" type="text" class="easyui-textbox"
							data-options="required:true,iconCls:'icon-man'" style="width: 150px;"> <input
							type="checkbox" id="check">自动登录 &nbsp;&nbsp; <a href="#">找回密码</a>
					</div>
					<div id="passwordDiv">
						<label for="password">密码:</label> <input id="password"
							name="password" type="password" class="easyui-textbox"
							data-options="required:true,iconCls:'icon-lock'" style="width: 150px;"> <input
							type="button" id="login" name="login" value="登录"
							style="width: 80px;"> &nbsp;&nbsp;&nbsp;&nbsp;<a href="../bbs/regist.jsp">注册用户</a>
					</div>
				</form>
			</div>
			<div id="loginedDiv">
			     <b>用户名:</b><font id="font"><%=session.getAttribute("username") %></font>
			     <a id="mb1" class="easyui-menubutton" data-options="menu:'#mm1',iconCls:'icon-edit'">我的</a>
			     <div id="mm1" class="easyui-menu" style="width: 100px;">		          			              
			                    <div><a>帖子</a></div>
			                    <div><a>收藏</a></div>
			                    <div><a>好友</a></div>			             		    
			     </div>
			     <a href="#" id="logout">退出</a>
			</div>
		</div>
		<div>
			<div id="table">				
				<table class="tab">
					<tr height="50px">
						<th class="th"><a href="../bbs/index.jsp">首页</a></th>
						<th class="th">校园信息</th>
						<th class="th">在线论坛</th>
						<th class="th"><a href="../bbs/regist.jsp">用户注册</a></th>
						<th class="th"><a href="../bbs/admin.jsp">后台管理</a></th>
					</tr>
				</table>
			</div>
		</div>	
</body>
</html>