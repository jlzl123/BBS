<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>bbs论坛</title>
<%@ include file="../../bbs/head.jsp"%>
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
#content{
   width: 300px;
   height: 80px;
}
#buttonDiv{
   padding-top: 10px;
}

#p {
   height:150px;
   padding:10px;
   background:#fafafa;
}
</style>
</head>
<body>
      <div style="height: 30px;background-color:#00BFFF;padding-top: 10px;">
          <b style="padding-left: 50px;color: white;">主题：<a id="param">${param.sectionName}</a></b>
          <font style="padding-left: 900px;color: white;">您现在的位置：<a href="/BBS/bbs/index.jsp">首页</a>>><b>版块</b></font>
      </div>
      <div>
           <table id="dd" class="easyui-datagrid">
                  <thead>
						<tr>
							<th data-options="field:'noteTitle',width:800" align="center"
								style=""><font size="3">标题</font></th>
							<th data-options="field:'userName',width:200,align:'right'"
								align="center"><font size="3">作者</font></th>
							<th data-options="field:'replayToatl',width:100" align="center"><font
								size="3">回复数</font></th>
							<th data-options="field:'newReplayUser',width:200" align="center"><font
								size="3">最新回复</font></th>	
						</tr>
					</thead>
           </table>
      </div>
      <div>
           <div id="buttonDiv">
                <input type="button" id="send" value="发帖" class="easyui-linkbutton">
           </div>
           <div id="contenDiv">
              <div id="p" class="easyui-panel" title="快速发帖">
                <div>
                     <b>标题:</b>
                     <input type="text" class="easyui-textbox" id="title" name="title">
                </div>
                <div>
                     <b>内容:</b>
                     <textarea id="content" name="content"></textarea>
                </div>
              </div>
           </div>
      </div>
</body>
</html>