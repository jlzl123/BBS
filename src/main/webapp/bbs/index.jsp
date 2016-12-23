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
	margin-left: 300px;
}

</style>
</head>
<body>
	
			<div id="sousuo" style="height: 50px;">
				<font color="blue">站内搜索</font>&nbsp;&nbsp;&nbsp;&nbsp; <input
					id="ss" style="width: 500px"></input>				

                   <div  id="mm" style="width:120px">
                        <div data-options="name:'all',iconCls:'icon-ok'">主题</div> 
                        <div data-options="name:'sports'">帖子</div>                       
                   </div>
			</div>			
			<div>
				<table id="tt" class="easyui-datagrid" iconCls="icon-save">
					<thead>
						<tr>
							<th data-options="field:'sectionName',width:800" align="center"
								style=""><font size="3">版块</font></th>
							<th data-options="field:'jianjie',width:300" align="center"><font
								size="3">简介</font></th>
							<th data-options="field:'sectionUser',width:200,align:'right'"
								align="center"><font size="3">版主</font></th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
</body>
</html>