<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@ include file="../bbs/head.jsp"%>
<script type="text/javascript">
     $(document).ready(function(){
    	 $("#test").click(function(){
    		 $.get("/BBS/adminControl/adminLogin",{"username":"123","password":"123"},
    				 function(data){
    			 alert(data)
    		 });
    	 });
     })
</script>
</head>
<body>
    <%=session.getAttribute("adminName") %>
    <a href="/BBS/adminControl/adminLogin?username=123&password=123">test</a>
    <button id="test">test</button>
</body>
</html>