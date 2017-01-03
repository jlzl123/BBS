<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="common.jsp"%>
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
					<li><a href="#">用户管理</a></li>
					<li><a href="#">文章管理</a></li>
					<li><a href="#">版块管理</a></li>
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
							<li class="active">文章管理</li>
						</ol>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<h5>文章列表</h5>
						</div>
						<!--前面的作为模板引入，类似head.html-->
						<!--这个table需要替换掉-->
						<!--文章管理列表-->
						<div class="table-responsive">
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
								<tbody>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>2016.12.16</td>
										<td>怎样使用 GitHub？</td>
										<td>校园新闻( <a href="#">修改所属版块</a>)
										</td>
										<td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a
											href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td>
									</tr>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>2016.12.16</td>
										<td>怎样使用 GitHub？</td>
										<td>校园新闻( <a href="#">修改所属版块</a>)
										</td>
										<td><a href="javascript:return%20false;"
											style="opacity: 0.2">删除</a>/ <a href="#">恢复</a>/ <a href="#">置顶</a></td>
									</tr>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>2016.12.16</td>
										<td>怎样使用 GitHub？</td>
										<td>校园新闻( <a href="#">修改所属版块</a>)
										</td>
										<td><a href="#">删除</a>/ <a
											href="javascript:return%20false;" style="opacity: 0.2">恢复</a>/
											<a href="#">置顶</a></td>
									</tr>
								</tbody>
							</table>
						</div>
						<!--版块管理列表-->
						<div class="table-responsive">
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
								<tbody>
									<tr>
										<td>001</td>
										<td>校园新闻(<a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="#">万万</a>(<a href="#">修改</a>)</td>

										<td><a href="#">删除</a>/ <a href="#">恢复</a>
									</tr>
									<tr>
										<td>001</td>
										<td>校园新闻(<a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="#">万万</a>(<a href="#">修改</a>)</td>

										<td><a href="#">删除</a>/ <a href="#">恢复</a>
									</tr>
									<tr>
										<td>001</td>
										<td>校园新闻(<a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="#">万万</a>(<a href="#">修改</a>)</td>

										<td><a href="#">删除</a>/ <a href="#">恢复</a>
									</tr>
								</tbody>
							</table>
						</div>
						<!--用户管理列表-->
						<div class="table-responsive">
							<table class="table table-striped">
								<thead>
									<tr>
										<th>用户ID</th>
										<th>用户名</th>
										<th>用户类型</th>
										<th>用户注册时间</th>
										<th>用户删除</th>
										<th>用户密码修改</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>普通用户( <a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="#">删除</a></td>
										<td><a href="#">修改</a></td>
									</tr>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>版主( <a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="javascript:return%20false;"
											style="opacity: 0.2">删除</a></td>
										<td><a href="#">修改</a></td>
									</tr>
									<tr>
										<td>001</td>
										<td>wanwan</td>
										<td>超级用户( <a href="#">修改</a>)
										</td>
										<td>2016.12.16</td>
										<td><a href="#">删除</a></td>
										<td><a href="#">修改</a></td>
									</tr>
								</tbody>
							</table>
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
</body>
</html>