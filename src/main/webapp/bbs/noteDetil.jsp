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
#sendReplay {
	height: 30px;
	width: 80px;
	font-size: 10pt;
	background: #0099FF;
	color: white;
}
#pp{
    height: 150px;
	padding: 10px;
	background: #fafafa;
}
#sendReplayDiv,#replayDiv{
    padding-top: 10px;
}
#replayContent {
	width: 500px;
	height: 80px;
}
#a{
    margin-top: 10px;
}
#huifuDiv{
    float: right;
    padding-top: 250px;
    padding-right: 10px;
    cursor: pointer;
}
#jubao,#huifu,#colseReplay{
    color: blue;
}
#huifu{
    float: right;
}
#colseReplay{
    float: right;
    display: none;
}
#inreplayDiv{
    border: solid 1px #c3c3c3;
    padding:50px;
    margin-top: 250px;
    margin-left:480px;
    width: 500px;  
    height:200px;
    background-color:#F0FFFF;
    display: none;
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
	<div>
	    <div id="replayDiv">
	         <font>发表回复</font>
	    </div>
	    <div id="a">
	        <div id="pp" class="easyui-panel" title="回复">
	             <textarea id="replayContent" name="replayContent"></textarea>
	             <div id="sendReplayDiv">
					<input type="button" id="sendReplay" value="发表">
		         </div>
	        </div>
	    </div>
	</div>
</body>
</html>