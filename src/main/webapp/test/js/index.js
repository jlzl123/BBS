var index={
		Data:[]
}

$(document).ready(function(){
	index.initSectionData();
})

index.initSectionData=function(){
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllSection",
		success:function(data){
			if(data=="查询所有版本信息异常!"){
				$.messager.alert("错误",data,"warning");
			}else{
//				index.Data=data;
                for(var i=0;i<data.length;i++){
                	var sectionName=data[i].sectionName;
                	var sectionUser=data[i].sectionUser;
                	var jianjie=data[i].jianjie;
                	$("#a").append('<div class="col-xs-6 col-lg-4"><h2>'+sectionName+'</h2>'
                			+'<div class="panel-body panel-subtitle">'
                			+'<span class="label label-success">'+sectionUser+'</span></div><p>'+jianjie+'</p>'
                			+'<p><a class="btn btn-default" href="/BBS/bbs/note.jsp?sectionName='+sectionName+'" role="button">去该板块 &raquo;</a>'
                			+'</p></div><!--/.col-xs-6.col-lg-4-->');               	
                }
			}
		}
	});
}