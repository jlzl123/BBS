var index={
		Data:[]
}

$(document).ready(function(){
//	index.initSectionData();
	index.initsectionData();
})

index.initSectionData=function(){
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllSection",
		success:function(data){
			if(data=="查询所有版本信息异常!"){
				alert(data);
			}else{
//				index.Data=data;
                for(var i=0;i<data.length;i++){
                	var sectionName=data[i].sectionName;
                	var sectionUser=data[i].sectionUser;
                	var jianjie=data[i].jianjie;
                	$("#a").append('<div class="col-xs-6 col-lg-4"><h2>'+sectionName+'</h2>'
                			+'<div class="panel-body panel-subtitle">'
                			+'<span class="label label-success">'+sectionUser+'</span></div><p>'+jianjie+'</p>'
                			+'<p><a class="btn btn-default" href="/BBS/test/note.jsp?sectionName='+sectionName+'" role="button">去该板块 &raquo;</a>'
                			+'</p></div><!--/.col-xs-6.col-lg-4-->');               	
                }
			}
		}
	});
}

index.initsectionData=function(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"/BBS/userControl/findSection",
		data:"pageIndex="+1,
		success:function(data){
			var str="";
			$.each(data.list.splice(0,9),function(i,n){
				str+='<div class="col-xs-6 col-lg-4"><h2>'+n.sectionName+'</h2>'
    			+'<div class="panel-body panel-subtitle">'
    			+'<span class="label label-success">'+n.sectionUser+'</span></div><p>'+n.jianjie+'</p>'
    			+'<p><a class="btn btn-default" href="/BBS/test/note.jsp?sectionName='+n.sectionName+'" role="button">去该板块 &raquo;</a>'
    			+'</p></div><!--/.col-xs-6.col-lg-4-->';
			});
//			$("#a").append(str);
			$("#sectionDiv").html(str);
			var pageCount=data.pageCount;
			var currentPage=data.currentPage;
			
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
							url:"/BBS/userControl/findSection",
							dataType:"json",
							data:"pageIndex="+page,
							success:function(data){
								var str="";
								$.each(data.list.splice((page-1)*9,(page-1)*9+9),function(i,n){
									str+='<div class="col-xs-6 col-lg-4"><h2>'+n.sectionName+'</h2>'
					    			+'<div class="panel-body panel-subtitle">'
					    			+'<span class="label label-success">'+n.sectionUser+'</span></div><p>'+n.jianjie+'</p>'
					    			+'<p><a class="btn btn-default" href="/BBS/test/note.jsp?sectionName='+n.sectionName+'" role="button">去该板块 &raquo;</a>'
					    			+'</p></div><!--/.col-xs-6.col-lg-4-->';
								});
								
//								$("#a").append(str);
								$("#sectionDiv").html(str);
							}
						});
					}
			}
			$('#example').bootstrapPaginator(options);
		}
	});
}