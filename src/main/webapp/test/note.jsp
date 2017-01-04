<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>帖子</title>
<%@include file="head.jsp"%>
<script type="text/javascript" src="../test/js/note.js"></script>
</head>
<body>
   <a id="param" style="display: none">${param.sectionName}</a>
	<div>
		<div class="input-group">

			<input type="text" class="form-control"> <span
				class="input-group-btn">
				<button class="btn btn-default" type="button">搜索</button>
			</span>
		</div>
		<!-- /input-group -->
	</div>
	<!-- /.col-lg-6 -->

	<div>
		<!-- LEFT -->


		<div class="panel panel-default">
			<div class="panel-body panel-subtitle">
				<span class="label label-success">最新文章</span> <span
					class="pull-right ordering"> 排序: <span> <a
						href="/?order=-last_replied">最后回复</a>
				</span> <span> <a href="/?order=-pub_date">发帖时间</a>
				</span>
				</span>

			</div>
			<div id="noteDiv"></div>
			<ul id="example"></ul>
			
			<!--  <div class="panel-footer"></div>-->
		</div>

	</div>
	<!-- END LEFT -->

	<div class="panel-footer"></div>

	<div class="panel panel-default">
	        <div id="tishi" class="alert alert-warning" role="alert" style="padding-top: 10px;">
                                                    请先<a href="#">登录</a> 或者 <a href="/BBS/test/regist.jsp">注册新账号</a> 然后发帖
            </div>
		<div class="panel-heading">发表帖子</div>
		<div class="panel-body">
			<form method="post">
				<div class="input-group">
					<span class="input-group-addon">主题名:</span> <input id="title" type="text"
						class="form-control" placeholder="少于64个字">
				</div>
				<div id="div_id_content_raw" class="form-group">
					<div class="controls ">
						<div class="wmd-wrapper" id="id_content_raw-wmd-wrapper">
							<div class="wmd-panel">
								<div id="id_content_raw_wmd_button_bar"></div>
								<textarea class="pagedownwidget form-control wmd-input"
									cols="40" id="content" name="content_raw" rows="10"></textarea>
							</div>
							<div id="id_content_raw_wmd_preview"
								class="wmd-panel wmd-preview"></div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="controls ">
						<input type="button" name="submit" value="发表"
							class="btn btn-primary" id="sendNote" title="警告"/>
					</div>
				</div>
			</form>
		</div>
	</div>

</body>
</html>