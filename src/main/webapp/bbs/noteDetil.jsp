<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>帖子详情</title>
<%@include file="../bbs/head.jsp" %>
<script type="text/javascript" src="../bbs/js/noteDetil.js"></script>
<style type="text/css">
.datagrid-header .datagrid-cell {
	height: 30px;
	padding-top: 10px;
}
</style>
</head>
<body> 
     <div style="height: 30px;width:100%; background-color: #00BFFF; padding-top: 10px;">
		<b style="padding-left: 50px; color: white;">标题：<a id="param1">${param.noteTitle}</a></b>
		<font style="padding-left:52%; color: white;">您现在的位置：<a
			href="/BBS/bbs/index.jsp">首页</a>>>
			<a id="param2">${param.sectionName}</a>>>
			<b>帖子详情</b></font>
	</div>
	<div>
	    <table id="tt" class="easyui-datagrid"></table>
	</div>
</body>
</html>