<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<%@include file="head.jsp"%>
</head>
<body>

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
			<!-- List group -->
			<ul class="list-group topic-list">

				<li class="list-group-item topic-entry">
					<div class="entry media">
						<div class="media-left media-middle">
							<a class="list-avatar-link" href="#"><img class="user-avatar"
								src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48"></a>
						</div>
						<div class="media-body media-middle">
							<a href="/detail/{{ blog.id}}" class="entry-link"> 标题 </a>
							<p class="entry-meta">

								<span class="meta"> <span
									class="label label-info meta-top"> 置顶 </span>
								</span> <span class="meta"> <a href="#"> <span
										class="label label-default meta-node"> 校园新闻 </span>
								</a>
								</span> <span class="meta meta-username"> <a href="#">
										发帖人:万万 </a>
								</span> <span class="meta meta-pub_date"> 2016.12.30 </span> <span
									class="meta meta-last_replied hidden-xs"> 最后回复:
									2016.12.30 </span>
							</p>
						</div>
						<div class="media-right media-middle">
							<span class="badge">回帖数:11</span>
						</div>
					</div>
				</li>

			</ul>
			<div class="panel-footer"></div>
		</div>

	</div>
	<!-- END LEFT -->

	<div class="panel-footer"></div>

	<div class="panel panel-default">
		<div class="panel-heading">发表帖子</div>
		<div class="panel-body">
			<form method="post">
				<div class="input-group">
					<span class="input-group-addon">主题名:</span> <input type="text"
						class="form-control" placeholder="少于64个字">
				</div>
				<div id="div_id_content_raw" class="form-group">
					<div class="controls ">
						<div class="wmd-wrapper" id="id_content_raw-wmd-wrapper">
							<div class="wmd-panel">
								<div id="id_content_raw_wmd_button_bar"></div>
								<textarea class="pagedownwidget form-control wmd-input"
									cols="40" id="id_content_raw" name="content_raw" rows="10"></textarea>
							</div>
							<div id="id_content_raw_wmd_preview"
								class="wmd-panel wmd-preview"></div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<div class="controls ">
						<input type="submit" name="submit" value="回复"
							class="btn btn-primary" id="submit-id-submit" />
					</div>
				</div>
			</form>
		</div>
	</div>

</body>
</html>