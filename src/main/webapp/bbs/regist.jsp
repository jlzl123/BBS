<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册</title>
<%@ include file="../../bbs/head.jsp"%>

 <script type="text/javascript">
         $(document).ready(function(){
        	$("#form").validate({
        		rules:{
        			username:{
        				required:true,
        				minlength:2
        			},
        			password:{
        				required:true,
        				minlength:6
        			},
        			repassword:{
        				required:true,
        				minlength:6,
        				equalTo:"#password"
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
         });
 </script>
  <style type="text/css">
               .error{
                    color:red;
               }
  </style>
</head>
<body>
      <div style="height: 30px;background-color:#00BFFF;padding-top: 10px;">
          <b style="padding-left: 50px;color: white;">用户注册</b>
          <font style="padding-left: 900px;color: white;">您现在的位置：<a href="#">首页</a>>><b>用户注册</b></font>
      </div>
      <b style="padding-left: 50%;margin-top: 10px">注册用户:</b>
      <div>
        <form id="form">
           <table border="1px" width="100%" bordercolor="#00FFFF">               
                 <tr height="35px">
                    <td width="200px">用户名:</td>
                    <td>
                        <input id="username" name="username" type="text">
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>密码:</td>
                    <td>
                        <input id="password" name="password" type="password">
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>确认密码:</td>
                    <td>
                        <input id="repassword" name="repassword" type="password">
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>年龄:</td>
                    <td>
                        <input id="age" name="age" type="text">
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>性别:</td>
                    <td>
                         <input id="sex" name="sex" type="radio" value="男" checked="checked">男
                         <input name="sex" type="radio" value="女">女
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>邮箱:</td>
                    <td>
                         <input id="email" name="email" type="email">
                    </td>
                 </tr>
                 <tr height="35px">
                    <td></td>
                    <td>
                        <input id="submit" type="submit" value="注册" style="width: 80px">
                        <input id="reset" type="reset" value="重置" style="width: 80px">
                    </td>
                 </tr>
           </table>
         </form>  
      </div>
</body>
</html>