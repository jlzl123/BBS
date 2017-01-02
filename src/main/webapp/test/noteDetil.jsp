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
<div > <!-- LEFT -->

    <div class="panel panel-default">
        <!-- Default panel contents -->
        <div class="panel-body">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li><a href="/n/1/">校园新闻</a></li>
                <li class="active">关于的新闻</li>
            </ol>
            <h1 class="topic-title">标题</h1>
            <div class="topic-meta row">
                <div class="col-xs-2 col-sm-1">
                    <img class="user-avatar"
                         src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48" alt=""/>
                </div>
                <div class="col-xs-9 col-sm-10">
                    <p class="text-muted">
                        <a href="/u/1/">发帖人</a>
                        <br/>
                        <span>发帖时间 <a class="text-primary" href="/n/1/">类型</a>, </span>
                        <span>查看: 1015 次</span>
                    </p>
                </div>
            </div>
            <div class="topic-content">
				<p>能否连任不是董明珠说了算？<br />在2014年的一次公开采访中，谈到2018年换届，董小姐表示自己上一届选举就想退了，绝不会像茅台老总季克良一样72岁还在辛苦连任。<br />纵观董明珠在格力的从业历程，随着格力业绩提升，董明珠的地位也越来越高。2013年，董明珠提出五年再造一个格力的目标，表示要在2018年实现2000亿元的营收，营业额每年增加20%，并在2013年，2014年都顺利完成了目标。在中小股东的支持下，董明珠最终成为格力集团和格力电器的双料董事长，这地位一直延续到今年11月董明珠格力集团董事长的位置被周乐伟接替。<br />然而从2015年开始，格力电器的营收同比下跌超过三成，根据财报数据，格力电器2015营收为977.45亿元，同比下降29.04%;今年前三季度营收984亿比2014年同期减少16.2%，连续两年增收200亿的目标已经落空。对比同为白色家电领头企业的美的，2015年实现营收1384.4亿元，同比仅微降2.28%。<br />家电行业专家梁振鹏告诉北京时间财经，格力的营业额不断缩水主要是由于格力电器产品结构非常单一，销售额主要由空调支撑，而美的等企业抢占了二十年前家电市场爆发式增长的先机，尤其多元化战略开展较早，因此不论从营业额、产品线齐全程度等方面来说，格力与美的相比处境更加艰难。<br />格力电器市场部部长陈自立告诉北京时间，由于在空调主业的增长空间已经有限，公司一直在寻求新的发展空间，这也是近年来公司进入冰箱、小家电等领域的原因。<br /></p>
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
        <ul class="list-group reply-list">
			<!--循环这里-->
            <li class="list-group-item reply-item">
                <div class="topic-meta row">
                    <div class="col-xs-2 col-sm-1">
                        <img class="user-avatar"
                             src="http://www.gravatar.com/avatar/c14d6906b85a0830d407b7f55f0f0f3e?d=&amp;s=48" alt=""/>
                    </div>
                    <div class="col-xs-9 col-sm-10">
                        <p class="text-muted">
                            <a href="#">回复者id</a> <br/>
                            <span>回复时间</span>
                        </p>
                    </div>
                </div>
                <div class="reply-content">
                    回复内容
                </div>
                <p class="reply-link">
                    <a href="#" data-username="kim0051" class="reply-to">回复他</a>
                </p>

            </li>
        </ul>

    </div>


	<div class="panel-footer">


        </div>

    <div class="panel panel-default">
        <div class="panel-heading">回帖</div>
        <div class="panel-body">


            <div class="alert alert-warning" role="alert">
                请先<a href="/login/">登录</a> 或者 <a href="/reg/">注册新账号</a> 然后回复

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
					<textarea class="pagedownwidget form-control wmd-input" cols="40" id="id_content_raw" name="content_raw" rows="10"></textarea>
				</div>
				<div id="id_content_raw_wmd_preview" class="wmd-panel wmd-preview">
				</div>
			</div>
		</div>
	</div>
	<div class="form-group">
		<div class="controls ">
	<input type="submit" name="submit" value="回复" class="btn btn-primary" id="submit-id-submit"/>
	</div>	</div> </form>
		</div>
    </div>



</div>
</body>
</html>