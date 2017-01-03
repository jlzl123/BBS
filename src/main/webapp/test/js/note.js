var note={
		Data:[]
}

$(document).ready(function(){
	note.initNoteData();
})

note.initNoteData=function(){
	var sectionName=$('#param').text();
	$.ajax({
		type:"POST",
		url:"/BBS/userControl/findallNoteBySectionId",
		dataType:"json",
		data:"sectionName="+sectionName+"&pageIndex="+1,
		success:function(data){
			if(data=="查询版快信息异常!"||data=="查询所有回复信息异常!"){
				alert(data);
			}else{
				var str="";
				$.each(data.list.splice(0,10),function(index,item){
					var addtime=note.paseDate(item.addtime);
					var newTime=note.paseDate(item.newTime);
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
						+'</span> <span class="meta meta-pub_date"> '+addtime+' </span> <span'
						+'class="meta meta-last_replied hidden-xs"> 最后回复:'
						+newTime+' </span</p></div>'
						+'<div class="media-right media-middle"><span class="badge">回帖数:'+item.replayToatl+'</span>'
						+'</div></div></li></ul>';
				});
				$("#noteDiv").html(str);
				
				var pageCount=data.pageCount;
				var currentPage=data.pageIndex;
				
				var options={
						bootstrapMajorVersion: 3, //版本
						currentPage: currentPage, //当前页数
						totalPages: pageCount, //总页数
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
								url:"/BBS/userControl/findallNoteBySectionId",
								dataType:"json",
								data:"sectionName="+sectionName+"&pageIndex="+page,
								success:function(data){							
									if(data=="查询版快信息异常!"||data=="查询所有回复信息异常!"){
										alert(data);
									}else{
										var str="";
										$.each(data.list.splice((page-1)*10,(page-1)*10+10),function(index,item){
											var addtime=note.paseDate(item.addtime);
											var newTime=note.paseDate(item.newTime);
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
												+'</span> <span class="meta meta-pub_date"> '+addtime+' </span> <span'
												+'class="meta meta-last_replied hidden-xs"> 最后回复:'
												+newTime+' </span</p></div>'
												+'<div class="media-right media-middle"><span class="badge">回帖数:'+item.replayToatl+'</span>'
												+'</div></div></li></ul>';
										});
										$("#noteDiv").html(str);
									}							
								}		
							});
						}
				}
			}						
			$('#example').bootstrapPaginator(options);
		}
	});
}

note.initnoteData=function(){
	var sectionName=$('#param').text();
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllNoteBySectionId?sectionName="+sectionName,		
		success:function(data){
			if(data=="查询版快信息异常!"||data=="查询所有回复信息异常!"){
				alert(data);
			}else{
				for(var i=0;i<data.length;i++){
					var noteTitle=data[i].noteTitle;
					var status=data[i].status;
					var userName=data[i].userName;
					var addtime=note.paseDate(data[i].addtime);
					var newReplayUser=data[i].newReplayUser;
					var newReplayUser=data[i].newReplayUser;
					var newTime=note.paseDate(data[i].newTime);
					var replayToatl=data[i].replayToatl
					var html='<!-- List group --><ul class="list-group topic-list">'
						+'<li class="list-group-item topic-entry">'
						+'<div class="entry media">'
						+'<div class="media-left media-middle">'
						+'<a class="list-avatar-link" href="#"><img class="user-avatar"'
						+'src="http://www.gravatar.com/avatar/4e5750bb485db473fc5fcaac227b78e3?d=&amp;s=48"></a></div>'
						+'<div class="media-body media-middle">'
						+'<a href="/BBS/test/noteDetil.jsp?noteTitle='+noteTitle+'" class="entry-link"> '+noteTitle+' </a>'
						+'<p class="entry-meta">'
						+'<span class="meta"> <span'
						+'class="label label-info meta-top"> '+status+' </span>'
						+'</span> <span class="meta"> <a href="#"> <span'
						+'class="label label-default meta-node"> 校园新闻 </span></a>'
						+'</span> <span class="meta meta-username"> <a href="#">发帖人:'+userName+' </a>'
						+'</span> <span class="meta meta-pub_date"> '+addtime+' </span> <span'
						+'class="meta meta-last_replied hidden-xs"> 最后回复:'
						+newTime+' </span</p></div>'
						+'<div class="media-right media-middle"><span class="badge">回帖数:'+replayToatl+'</span>'
						+'</div></div></li></ul>';
					$("#noteDiv").append(html);
				}
			}
		}
	});
}

//解析时间字符串
note.paseDate=function(date){
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
note.padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}