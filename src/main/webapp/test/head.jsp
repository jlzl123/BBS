<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
<%@include file="common.jsp"%>
<script type="text/javascript">
	$(document).ready(function() {
		 var session= '<%=session.getAttribute("username")%>';
    	 var isExist=<%=request.getAttribute("isExist")%>;
    	 if(session!='null'){
    		 $("#logined").css("display","block");
		     $("#form").css("display","none");
    	 }else{
    		 if(isExist){
    			 $("#logined").css("display","block");
    		     $("#form").css("display","none");
    		 }
    	 }
		
		$("#login").click(function() {
			var pass = $("#password").val();
			var password = hex_md5(pass)//md5加密  		 
			$.post("/BBS/userControl/userLogin", {
				"username" : $("#username").val(),
				"password" : password,
				"isChecked" : $("#check").is(":checked")
			}, function(data) {
				if (data) {
					$("#form").css("display", "none");
					$("#logined").css("display", "block");
					$("#span").text($("#username").val());
					$("#tishi").css("display", "none");
				} else {
					alert("登录失败，用户名或密码错误！");
				}
			});
		});
		$("#loginOut").click(function(){
			 $.get("/BBS/userControl/userLogout",{"username":$("#span").val()},
    				 function(data){
    			        if(data){
    			        	$("#logined").css("display","none");
       				        $("#form").css("display","block");
       				        $("#span").text("null");
       				        $("#tishi").css("display", "block");
       				        alert("成功退出！");
    			        }
    		 });
		});
		
		//改变搜索条件
		$(".sstj").click(function(){
			var text=$(this).text();
			$("#tj").html(text+'<span class="caret"></span>');
		});
		$("#ss").click(function(){
			var name=$("#tj").text().trim();
			var value=$("#ssContent").val();
			if(value.trim()==""){
				alert("请输入搜素内容");
			}else{
				if(name=="主题"){
					var sectionName=value.trim();
					$.get("/BBS/userControl/findAllSectionBySectionName",{"sectionName":sectionName},
							function(data){
						if(data.length>0){
						    $(".div").css("display","none");
							var str="";
							$.each(data,function(index,item){
								str+='<div class="col-xs-6 col-lg-4"><h2>'+item.sectionName+'</h2>'
	                			+'<div class="panel-body panel-subtitle">'
	                			+'<span class="label label-success">'+item.sectionUser+'</span></div><p>'+item.jianjie+'</p>'
	                			+'<p><a class="btn btn-default" href="/BBS/test/note.jsp?sectionName='+item.sectionName+'" role="button">去该板块 &raquo;</a>'
	                			+'</p></div><!--/.col-xs-6.col-lg-4-->';
							});
							var html='<div"><!-- LEFT -->'
							+'<div class="panel panel-default">'
							+'<div class="panel-body panel-subtitle">'
							+'<span class="label label-success">热门板块</span>'
							+'</div><!-- List group --><div>'+str+'</div>'
							+'<!--/.col-xs-6.col-lg-4-->'
							+'<div class="panel-footer"></div></div></div>';
							$("#ssc").html(html);
						}else{
							alert("您搜素内容不存在!");
						}
					});
				}else if(name=="帖子"){
					var noteTitle=value.trim();
					$.get("/BBS/userControl/findAllNoteByNoteTitle",{"noteTitle":noteTitle},
							function(data){
						if(data.length>0){
							var str="";
							$.each(data,function(index,item){
								str+='<!-- List group --><ul class="list-group topic-list">'
									+'<li class="list-group-item topic-entry">'
									+'<div class="entry media">'
									+'<div class="media-left media-middle">'
									+'<a class="list-avatar-link" href="#"><img class="user-avatar"'
									+'src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48"></a></div>'
									+'<div class="media-body media-middle">'
									+'<a href="/BBS/test/noteDetil.jsp?noteTitle='+item.noteTitle+'" class="entry-link"> '+item.noteTitle+' </a>'
									+'<p class="entry-meta">'
									+'<span class="meta"> <span'
									+'class="label label-info meta-top"> '+item.status+' </span>'
									+'</span> <span class="meta"> <a href="#"> <span'
									+'class="label label-default meta-node"> 校园新闻 </span></a>'
									+'</span> <span class="meta meta-username"> <a href="#">发帖人:'+item.userName+' </a>'
									+'</span> <span class="meta meta-pub_date"> '+paseDate(item.addtime)+' </span> <span'
									+'class="meta meta-last_replied hidden-xs"> 最后回复:'
									+'<a href="#">'+item.userName+'</a>&nbsp;'+paseDate(item.newTime)+' </span</p></div>'
									+'<div class="media-right media-middle"><span class="badge">回帖数:'+item.replayToatl+'</span>'
									+'</div></div></li></ul>';
							});
							$("#noteDiv").html(str);
						}else{
							alert("您搜素内容不存在!");
						}
					})
				}else if(name=="作者"){
					var userName=value.trim();
					$.get("/BBS/userControl/findAllNoteByUserName",{"userName":userName},
							function(data){
						if(data.length>0){
							var str="";
							$.each(data,function(index,item){
								str+='<!-- List group --><ul class="list-group topic-list">'
									+'<li class="list-group-item topic-entry">'
									+'<div class="entry media">'
									+'<div class="media-left media-middle">'
									+'<a class="list-avatar-link" href="#"><img class="user-avatar"'
									+'src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48"></a></div>'
									+'<div class="media-body media-middle">'
									+'<a href="/BBS/test/noteDetil.jsp?noteTitle='+item.noteTitle+'" class="entry-link"> '+item.noteTitle+' </a>'
									+'<p class="entry-meta">'
									+'<span class="meta"> <span'
									+'class="label label-info meta-top"> '+item.status+' </span>'
									+'</span> <span class="meta"> <a href="#"> <span'
									+'class="label label-default meta-node"> 校园新闻 </span></a>'
									+'</span> <span class="meta meta-username"> <a href="#">发帖人:'+item.userName+' </a>'
									+'</span> <span class="meta meta-pub_date"> '+paseDate(item.addtime)+' </span> <span'
									+'class="meta meta-last_replied hidden-xs"> 最后回复:'
									+'<a href="#">'+item.userName+'</a>&nbsp;'+paseDate(item.newTime)+' </span</p></div>'
									+'<div class="media-right media-middle"><span class="badge">回帖数:'+item.replayToatl+'</span>'
									+'</div></div></li></ul>';
							});
							$("#noteDiv").html(str);
						}else{
							alert("您搜素内容不存在!");
						}
					})
				}else{
					alert("您还没有选择搜索条件");
				}
			}
		});
	})
	
	//解析时间字符串
paseDate=function(date){
	var time=new Date(date);
	var year=time.getFullYear();
	var month=note.padleft0(time.getMonth()+1);
	var day=note.padleft0(time.getDate());
	var hour=note.padleft0(time.getHours());
	var minute=note.padleft0(time.getMinutes());
	var second=note.padleft0(time.getSeconds());
	return year+"-"+month+"-"+day+" "+hour + ":" + minute + ":" + second ;
}

//补齐两位数
padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

</script>
<style type="text/css">
.panel-header, .panel-body {
	border-width: 0px;
}

.datagrid, .combo-p {
	border: solid 1px #D4D4D4;
}

.datagrid * {
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
}
</style>
</head>
<body>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">校园BBS</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<form class="navbar-form navbar-right" role="form" id="form">
				<div class="form-group">
					<input id="username" type="text" placeholder="用户名"
						class="form-control">
				</div>
				<div class="form-group">
					<input id="password" type="password" placeholder="密码"
						class="form-control">
				</div>

				<input id="login" type="button" class="btn btn-success" value="登录"></input>
				<div class="checkbox">
					<label> <input id="check" type="checkbox">记住密码 <a>忘记密码</a>
					</label>
				</div>
				<button class="btn">注 册</button>
			</form>
			<div class="navbar-form navbar-right" style="display: none" id="logined">
			     <a href="#">
                   <span id="span" class="glyphicon glyphicon-user"><%=session.getAttribute("username") %></span>
                 </a>
                 <button id="loginOut" type="button" class="btn btn-default btn-sm">退出</button>
			</div>
		</div>
		<!--/.navbar-collapse -->
	</div>
	</nav>


	<!-- Main jumbotron for a primary marketing message or call to action -->
	<div class="jumbotron">
		<div class="container">
			<h1>欢迎来到本论坛!</h1>
		</div>
	</div>

	<nav class="navbar navbar-default" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<a class="navbar-brand" href="/BBS/test/index.jsp">首页</a>
		</div>
		<div>
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">校园信息</a></li>
				<li><a href="/BBS/test/index.jsp">在线论坛</a></li>
				<li><a href="/BBS/test/regist.jsp">用户注册</a></li>
				<li><a href="/BBS/test/adminLogin.jsp">后台管理</a></li>

			</ul>
		</div>
	</div>
	</nav>


	<div>
		<div class="input-group">
			<div class="input-group-btn">
				<button id="tj" type="button" class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					站内搜索 <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu">
					<li><a href="#" class="sstj">作者</a></li>
					<li><a href="#" class="sstj">帖子</a></li>
					<li><a href="#" class="sstj">主题</a></li>
				</ul>
			</div>
			<!-- /btn-group -->
			<input id="ssContent" type="text" class="form-control"><span class="input-group-btn">
				<button id="ss" class="btn btn-default" type="button">搜索</button></span>
		</div>
		<!-- /input-group -->
	</div>
	<!-- /.col-lg-6 -->
    
</body>
</html>