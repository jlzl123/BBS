<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>帖子详情</title>
<%@include file="head.jsp"%>
<script type="text/javascript" src="../test/js/noteDetil.js"></script>
</head>
<body>
<div > <!-- LEFT -->

    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li><a href="/n/1/">校园新闻</a></li>
                <li class="active">关于的新闻</li>
            </ol>
            <h1 id="noteTitle" class="topic-title">${param.noteTitle} </h1>
            <div class="topic-meta row">
                <div class="col-xs-2 col-sm-1">
                    <img class="user-avatar"
                         src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48" alt=""/>
                </div>
                <div class="col-xs-9 col-sm-10">
                    <p class="text-muted">
                        <a href="/u/1/" id="noteUser"></a>
                        <br/>
                        <span><font id="noteAddTime"></font>&nbsp;<a class="text-primary" id="sectionName"></a>, </span>
                        <span>查看: <a id="replayTatol"></a> 次</span>
                    </p>
                </div>
            </div>
            <div class="topic-content">
				<p id="noteContent"><br /></p>
            </div>
        </div>

        <ul class="list-group">

        </ul>


    </div>
    <div class="panel panel-default">
        <div class="panel-heading">

            100回复数

        </div>
        <!-- List group -->
        
        <div id="noteDetilDiv"></div>
	    <ul id="example"></ul>

    </div>

	<div class="panel-footer">


        </div>

    <div class="panel panel-default">
        <div class="panel-heading">回帖</div>
        <div class="panel-body">


            <div id="tishi" class="alert alert-warning" role="alert">
                                                    请先<a href="#">登录</a> 或者 <a href="/BBS/test/regist.jsp">注册新账号</a> 然后回复
            </div>


        </div>
    </div>

	<div class="panel panel-default">
        <div class="panel-heading">发表回复</div>
        <div class="panel-body">
			<form  method="post" >
	<input type='hidden' name='csrfmiddlewaretoken' value='VqI90nTviLspVtJlQkKeGxomBnfTRPcR' />
	<div id="div_id_content_raw" class="form-group">
		<div class="controls ">
			<div class="wmd-wrapper" id="id_content_raw-wmd-wrapper">
				<div class="wmd-panel"> <div id="id_content_raw_wmd_button_bar"></div>
					<textarea class="pagedownwidget form-control wmd-input" cols="40" id="replayContent" name="content_raw" rows="10"></textarea>
				</div>
				<div id="id_content_raw_wmd_preview" class="wmd-panel wmd-preview">
				</div>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="controls ">
	<input type="button" name="submit" value="回复" class="btn btn-primary" id="sendReplay"/>
	</div>	</div> </form>
		</div>
    </div>



</div>
</body>
</html>