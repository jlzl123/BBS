var noteDetil={
		Data:[]
}

$(document).ready(function(){
	noteDetil.ChangeInfoDiv();
	noteDetil.initNoteDetil();
	noteDetil.initReplayData();
	noteDetil.sendReplay();
})

noteDetil.initReplayData=function(){
	var noteTitle=$("#noteTitle").text();
	$.ajax({
		type:"POST",
		url:"/BBS/userControl/findAllReplay",
		dataType:"json",
		data:"noteTitle="+noteTitle+"&pageIndex="+1,
		success:function(data){
			if (data == "查询帖子信息异常!" || data == "查询所有回复信息异常!") {
				alert(data);
			} else{
				var str="";
				$.each(data.list.slice(0,10),function(index,item){
					var replayTime=noteDetil.paseDate(item.replayTime);
					str+='<ul class="list-group reply-list"><!--循环这里-->'
						+'<li class="list-group-item reply-item">'
					    +'<div class="topic-meta row"><div class="col-xs-2 col-sm-1">'
		                +'<img class="user-avatar"'
		                +'src="http://www.gravatar.com/avatar/c14d6906b85a0830d407b7f55f0f0f3e?d=&amp;s=48" alt=""/>'
		                +'</div><div class="col-xs-9 col-sm-10">'
		                +'<p class="text-muted"><a href="#">'+item.userName+'</a> <br/>'
		                +'<span>'+replayTime+'</span></p></div></div>'
		                +'<div class="reply-content">'+item.replayContent+'</div>'
		                +'<p class="reply-link">'
		                +'<a href="#" data-username="kim0051" class="reply-to">回复他</a>'
		                +'</p></li></ul>';
				});
				$('#noteDetilDiv').html(str);
				
				var currentPage=data.pageIndex;
				var pageCount=data.pageCount;
				
				var options={
						bootstrapMajorVersion:3,
						currentPage:currentPage,
						totalPages:pageCount,
						numberOfPages:5,
						alignment:"left",
						itemTexts:function(type,page,current){
							switch(type){
							    case "first":
							    	return "首页";
							    case "prev":
							    	return "上一页";
							    case "next":
							    	return "下一页";
							    case "last":
							    	return "末页";
							    case "page":
							    	return page;
							}
						},
						onPageClicked:function(event,originalEvent,type,page){
							$.ajax({
								type:"POST",
								url:"/BBS/userControl/findAllReplay",
								dataType:"json",
								data:"noteTitle="+noteTitle+"&pageIndex="+page,
								success:function(data){
									if (data == "查询帖子信息异常!" || data == "查询所有回复信息异常!") {
										alert(data);
									} else{	
										var str="";
										$.each(data.list.slice((page-1)*10,(page-1)*10+10),function(index,item){
											var replayTime=noteDetil.paseDate(item.replayTime);
											str+='<ul class="list-group reply-list"><!--循环这里-->'
												+'<li class="list-group-item reply-item">'
											    +'<div class="topic-meta row"><div class="col-xs-2 col-sm-1">'
								                +'<img class="user-avatar"'
								                +'src="http://www.gravatar.com/avatar/c14d6906b85a0830d407b7f55f0f0f3e?d=&amp;s=48" alt=""/>'
								                +'</div><div class="col-xs-9 col-sm-10">'
								                +'<p class="text-muted"><a href="#">'+item.userName+'</a> <br/>'
								                +'<span>'+replayTime+'</span></p></div></div>'
								                +'<div class="reply-content">'+item.replayContent+'</div>'
								                +'<p class="reply-link">'
								                +'<a href="#" data-username="kim0051" class="reply-to">回复他</a>'
								                +'</p></li></ul>';
										});
										$("#noteDetilDiv").html(str);
									}
								}
						    });
						}
				
				}
				$('#example').bootstrapPaginator(options);
			}
		}
	});
}

noteDetil.initNoteDetil=function(){
	var noteTitle=$("#noteTitle").text();
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findNoteDetilByNoteTitle",
		dataType:"json",
		data:"noteTitle="+noteTitle,
		success:function(data){	   
			$("#noteUser").text(data.note.userName);
			$("#noteAddTime").text(noteDetil.paseDate(data.note.addtime));
			$("#sectionName").text(data.sectionName);
			$("#sectionName").attr("href","/BBS/test/note.jsp?sectionName="+data.sectionName);
			$("#replayTatol").text(data.note.replayToatl);
			$("#noteContent").text(data.note.content);
		}
	});
}

//解析时间字符串
noteDetil.paseDate = function(date) {
	var time = new Date(date);
	var year = time.getFullYear();
	var month = noteDetil.padleft0(time.getMonth() + 1);
	var day = noteDetil.padleft0(time.getDate());
	var hour = noteDetil.padleft0(time.getHours());
	var minute = noteDetil.padleft0(time.getMinutes());
	var second = noteDetil.padleft0(time.getSeconds());
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":"
			+ second;
}

//补齐两位数
noteDetil.padleft0 = function(obj) {
	return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

noteDetil.ChangeInfoDiv=function(){
	var username=$("#span").text();
	if(username.trim()!="null"){
		$("#tishi").css("display","none");
	}else{
		$("#tishi").css("display","block");
	}
}

noteDetil.sendReplay=function(){
	$("#sendReplay").click(function(){
		var replayContent = $("#replayContent").val();
		var username = $("#span").text();
		var noteTitle = $("#noteTitle").text();
		var json = {
			"replayContent" : replayContent,
			"noteTitle" : noteTitle,
			// "userName":username,
			"replayTime" : new Date()
		}
		if (replayContent.trim()!="" ) {
			$.ajax({
				type : "POST",
				url : "/BBS/userControl/addReplay",
				dataType : "text",
				data : JSON.stringify(json),
				contentType : "application/json;charset=utf-8",
				success : function(data) {
					if (data == "success") {
						alert("回复成功");
//						noteDetil.getReplayData();
					} else if (data == "noLogin") {
						alert("您还未登录，请先登录！");
					} else if (data == "查询帖子信息异常!"
							|| data == "添加回复信息异常!"
							|| data == "更新帖子信息异常!") {
						alert(data);
					}
				}
			});
		}else{
			alert("请输入回复内容！")
		}
	});
}