<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>
<%@include file="common.jsp"%>
<script type="text/javascript" src="../test/js/admin.js"></script>
<style type="text/css">
.nav-header.collapsed &amp ;amp;amp;amp;amp;amp;amp;amp;gt; span.glyphicon-chevron-toggle:before
	{
	content: &amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	quot;
	\e114
	&amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	quot;;
}

.nav-header &amp ;amp;amp;amp;amp;amp;amp;amp;gt; span.glyphicon-chevron-toggle:before
	{
	content: &amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	quot;
	\e113
	&amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	amp;
	quot;;
}

.secondmenu a {
	font-size: 12px;
	color: #4A515B;
	text-align: center;
}

.secondmenu li.active {
	background-color: #eee;
	border-color: #428bca;
}
</style>
</head>
<body>
	<!--左边-->
	<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
			</button>
			<a class="navbar-brand" href="#">BBS管理后台</a>
		</div>
		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">设置</a></li>
				<li><a href="#">帮助</a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<input type="text" class="form-control" placeholder="搜索..." />
			</form>
		</div>
	</div>
	</nav>
	<!--右边-->
	<div class="container-fluid">
		<div class="row row-offcanvas row-offcanvas-left">
			<div class="col-sm-3 col-md-2 sidebar-offcanvas" id="sidebar"
				role="navigation">
				<a href="#systemSetting" class="nav-header collapsed"
					data-toggle="collapse">系统管理</a>
				<ul id="systemSetting" class="nav nav-list collapse secondmenu"
					style="height: 0px;">
					<!--<li class="active"><a href="#"><i class="glyphicon glyphicon-user"></i> 用户管理</a></li>-->
					<li><a href="#" id="userAdmin">用户管理</a></li>
					<li><a href="#" id="noteAdmin">文章管理</a></li>
					<li><a href="#" id="sectionAdmin">版块管理</a></li>
					<li><a href="#">修改密码</a></li>
					<li><a href="#">日志查看</a></li>
				</ul>
			</div>
			<!--/span-->
			<div class="col-sm-9 col-md-10 main">
				<div class="panel panel-default">
					<!-- Default panel contents -->
					<div class="panel-body">
						<ol class="breadcrumb">
							<li><a href="/">后台管理</a></li>
							<li><a href="/n/1/">系统管理</a></li>
							<li class="active" id="guanli">文章管理</li>
						</ol>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h5 id="tag">文章列表</h5>
						</div>
						<!--前面的作为模板引入，类似head.html-->
						<!--这个table需要替换掉-->
						<!--文章管理列表-->
						<div class="table-responsive" id="noteAdminDiv" style="display: none">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>序号</th>
										<th>作者</th>
										<th>发表时间</th>
										<th>标题</th>
										<th>版块</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody id="tbodyNote">
									
									
								</tbody>
							</table>
							<ul id="exampleNote"></ul>
						</div>
						<!--版块管理列表-->
						<div class="table-responsive" id="sectionAdminDiv" style="display: none">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>序号</th>
										<th>版块名</th>
										<th>版块创建时间</th>
										<th>版块管理员</th>
										<th>版块操作(<a href="#">新增板块</a>)
										</th>
									</tr>
								</thead>
								<tbody id="tbodySection">
									
								</tbody>
							</table>
							<ul id="exampleSection"></ul>
						</div>
						<!--用户管理列表-->
						<div class="table-responsive" id="userAdminDiv">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>用户ID</th>
										<th>用户名</th>
										<th>用户类型</th>
										<th>用户注册时间</th>
										<th>用户删除</th>
										<th>用户状态</th>
									</tr>
								</thead>
								<tbody id="tbodyUser">
									
								</tbody>
							</table>
							<ul id="exampleUser"></ul>
						</div>
					</div>
				</div>
				<!--/.container-->
				<footer>
				<p class="pull-right">
					<a href="https://github.com/HuRuWo">@HuRuWo Company</a>
				</p>
				</footer>
			</div>
		</div>
	</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="float: left;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					提示
				</h4>
			</div>
			<div class="modal-body">
				确定要删除该用户吗
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<a id="a" style="display: none"></a>
				<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="admin.removeUser(this)">
					确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="float: left;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					<font id="banzhu"></font> 版主所管理的版块
				</h4>
			</div>
			<div class="modal-body mb1">
				<table class="table table-striped">
								<thead>
									<tr>
										<th>版块ID</th>
										<th>版块名</th>
										<th>版块创建时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody id="tbodyUserSection">
									
								</tbody>
							</table>
			</div>
			<h4 class="modal-title" id="myModalLabel">
					&nbsp;&nbsp;&nbsp;版主暂定的版块
			</h4>
			<div class="modal-body mb2">
				<table class="table table-striped">
								<thead>
									<tr>
										<th>版块ID</th>
										<th>版块名</th>
										<th>版块创建时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody id="tbodyUserSection1">
									
								</tbody>
							</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
				<a id="a" style="display: none"></a>
				<button type="button" class="btn btn-primary" data-dismiss="modal">
					确定
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>
</html>