<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册</title>
<%@ include file="../../bbs/head.jsp"%>

 <script type="text/javascript" src="../bbs/js/regist.js"></script>
  <style type="text/css">
               .error{
                    color:red;
               }
  </style>
</head>
<body>
      <div style="height: 30px;background-color:#00BFFF;padding-top: 10px;">
          <b style="padding-left: 50px;color: white;">用户注册</b>
          <font style="padding-left: 900px;color: white;">您现在的位置：<a href="/BBS/bbs/index.jsp">首页</a>>><b>用户注册</b></font>
      </div>
      <b style="padding-left: 50%;margin-top: 10px">注册用户:</b>
      <div>
        <form id="form">
           <table border="1px" width="100%" bordercolor="#00FFFF">               
                 <tr height="35px">
                    <td width="200px">用户名:</td>
                    <td>
                        <input id="user" name="user" type="text">
                        <a id="errorFont" style="color: red;display: none">用户名已存在！</a>                       
                    </td>
                 </tr>
                 <tr height="35px">
                    <td>密码:</td>
                    <td>
                        <input id="pass" name="pass" type="password">
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
                        <input id="submit" type="button" value="注册" style="width: 80px">
                        <input id="reset" type="reset" value="重置" style="width: 80px">
                    </td>
                 </tr>
           </table>
         </form>  
      </div>
</body>
</html>