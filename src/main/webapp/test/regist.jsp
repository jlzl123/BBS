<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="head.jsp"%>
</head>
<body>

<div class="panel panel-default">
        <div class="panel-body">
     <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li><a href="/n/1/">用户注册</a></li>
            </ol>
                     <form method="post" action="/reg/">
                <div class="form-group">
                    <label for="usernameInput">用户名</label>
                    <input type="text" name="username" class="form-control" id="usernameInput" placeholder="">
                </div>
                <div class="form-group">
                    <label for="emailInput">电子邮件</label>
                    <input type="email" name="email" class="form-control" id="emailInput" placeholder="">
                </div>
                <div class="form-group">
                    <label for="InputPassword1">密码</label>
                    <input type="password" name="password1" class="form-control" id="InputPassword1" placeholder="">
                </div>
                <div class="form-group">
                    <label for="InputPassword2">重新输入一遍密码</label>
                    <input type="password" name="password2" class="form-control" id="InputPassword2" placeholder="">
                </div>
                         <div class="form-group">
                    <label for="InputPassword2">性别</label>
                      <div class="radio">
   <label>
      <input type="radio" name="optionsRadios" id="optionsRadios1"
         value="option1" checked> 男
   </label>
                          <label>
      <input type="radio" name="optionsRadios" id="optionsRadios2"
         value="option2">
         女
   </label>
</div>
                             </div>

                <button type="submit" class="btn btn-default">注册</button>
                         <button type="reset" class="btn btn-default">重置</button>

            </form>

        </div>
        </div>
    </div>

</body>
</html>