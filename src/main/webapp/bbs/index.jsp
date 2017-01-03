<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>首页</title>
<%@ include file="../bbs/head.jsp"%>
<script type="text/javascript" src="../bbs/js/index.js"></script>
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

.datagrid-header .datagrid-cell {
	height: 35px;
	padding-top: 10px;
}

#table {
	background-color: activecaption;
}

#sousuo {
	margin-top: 20px;
	margin-left: 30%;
}

#tt, #ttDiv {
	width: 100%;
}
#dt{
    float: right;
}
</style>
</head>
<body>

	<div id="sousuo" style="height: 50px;">
		<font color="blue">站内搜索</font>&nbsp;&nbsp;&nbsp;&nbsp; <input id="ss"
			style="width: 500px"></input>

		<div id="mm" style="width: 120px">
			<div data-options="name:'sectionName',iconCls:'icon-ok'"><font id="sectionName">主题</font></div>
			<div data-options="name:'noteTitle',iconCls:'icon-ok'"><font id="noteTitle">帖子</font></div>
			<div data-options="name:'userName',iconCls:'icon-ok'"><font id="userName">用户</font></div>
			<div data-options="name:'newTime',iconCls:'icon-ok'"><font id="newTime">最新发表</font></div>
		</div>
		<input id="dt" type="text" style="display: none">
	</div>
	<div id="ttDiv">
		<table id="tt" class="easyui-datagrid" iconCls="icon-save">
			<thead>
				<tr>
					<th data-options="field:'sectionName',width:index.fixWidth(0.7)"
						align="center" style=""><font size="3">版块</font></th>
					<th data-options="field:'jianjie',width:index.fixWidth(0.2)"
						align="center"><font size="3">简介</font></th>
					<th
						data-options="field:'sectionUser',width:index.fixWidth(0.1),align:'right'"
						align="center"><font size="3">版主</font></th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="tDiv" style="display: none">
		<table id="t" class="easyui-datagrid" style="display: none">
			<thead>
				<tr>
					<th data-options="field:'noteTitle',width:index.fixWidth(0.75)"
						align="center" style=""><font size="3">标题</font></th>
					<th
						data-options="field:'userName',width:index.fixWidth(0.1),align:'right'"
						align="center"><font size="3">作者</font></th>
					<th data-options="field:'replayToatl',width:index.fixWidth(0.05)"
						align="center"><font size="3">回复数</font></th>
					<th data-options="field:'newReplayUser',width:index.fixWidth(0.1)"
						align="center"><font size="3">最新回复</font></th>
				</tr>
			</thead>
		</table>
	</div>
	</div>
	</div>
</body>
</html>