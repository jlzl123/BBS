<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bbs论坛</title>
<%@ include file="../bbs/head.jsp"%>
<script type="text/javascript" src="../bbs/js/note.js"></script>
<style type="text/css">
.datagrid-header .datagrid-cell {
	height: 30px;
	padding-top: 10px;
}

#send {
	height: 40px;
	width: 100px;
	font-size: 16pt;
	background: #0099FF;
	color: white;
}

#sendNote {
	height: 30px;
	width: 80px;
	font-size: 10pt;
	background: #0099FF;
	color: white;
}

#content {
	width: 500px;
	height: 80px;
}

#p {
	height: 150px;
	padding: 10px;
	background: #fafafa;
}

#contenDiv {
	margin-top: 10px;
}

#c, #sendNoteDiv, #buttonDiv {
	padding-top: 10px;
}

#title {
	width: 300px;
}
#navition{
    color: white;
    float: right;
    padding-right: 30px;
}
</style>
</head>
<body>
	<div
		style="height: 30px; background-color: #00BFFF; padding-top: 10px;">
		<b style="padding-left: 50px; color: white;">主题：<a id="param">${param.sectionName}</a></b>
		<font id="navition">您现在的位置：<a
			href="/BBS/bbs/index.jsp">首页</a>>><b>版块</b></font>
	</div>
	<div>
		<table id="dd" class="easyui-datagrid">
			<thead>
				<tr>
					<th data-options="field:'noteTitle',width:note.fixWidth(0.75)" align="center"
						style=""><font size="3">标题</font></th>
					<th data-options="field:'userName',width:note.fixWidth(0.1),align:'right'"
						align="center"><font size="3">作者</font></th>
					<th data-options="field:'replayToatl',width:note.fixWidth(0.05)" align="center"><font
						size="3">回复数</font></th>
					<th data-options="field:'newReplayUser',width:note.fixWidth(0.1)" align="center"><font
						size="3">最新回复</font></th>
				</tr>
			</thead>
		</table>
	</div>
	<!-- 这里与ie内核浏览器冲突 -->
	<div>
		<div id="buttonDiv">
			<input type="button" id="send" value="发帖" class="easyui-linkbutton">
		</div>
		<div id="contenDiv">
			<div id="p" class="easyui-panel" title="快速发帖">
				<div>
					<b>标题:</b> <input type="text" class="easyui-textbox" id="title"
						name="title">
				</div>
				<div id="c">
					<b>内容:</b>
					<textarea id="content" name="content"></textarea>
				</div>
				<div id="sendNoteDiv">
					<input type="button" id="sendNote" value="发表帖子">
				</div>
			</div>
		</div>
	</div>
</body>
</html>