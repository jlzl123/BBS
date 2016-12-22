var note={
		Data:[]
}


$(document).ready(function(){
	note.getNoteData();
})

note.initDatagrid=function(){
	$("#dd").datagrid({
		pagination:true,
		data:note.Data.slice(0, 10),
		rowStyler:function(index,row){
			return 'height:40px';
		},
		onLoadSuccess:function(data){//设置表格字体css
			var panel=$(this).datagrid('getPanel');
			var tr=panel.find('div.datagrid-body tr');
			tr.each(function(){
				var td=$(this).children('td');//('td[field="noteTitle"]')选择noteTitle列
				td.children("div").css({
					"text-align":"left",
				    "font-size":"12pt",
				    "cursor":"pointer"	//鼠标变小手
				});			
			});
		}
	});
	
	var pager=$("#dd").datagrid("getPager");
	pager.pagination({
		total:note.Data.length,
		layout : ['list','sep','first','prev','links','next','last','efresh','manual'],
		onSelectPage:function(pageNo,pageSize){
			var start=(pageNo-1)*pageSize;
			var end=start+pageSize;
			$("#dd").datagrid('loadData',note.Data.slice(start, end));
			pager.pagination('refresh',{
				total:note.Data.length,
				pageNumber:pageNo
			});
		}
	});
}

note.getNoteData=function(){
	var sectionName=$("#param").html();	
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllNoteBySectionId?sectionName="+sectionName,		
		success:function(data){
			note.Data=note.paseData(data);
			note.initDatagrid();			
		}
	});
}

//解析数据
note.paseData=function(data){
	var shuju=new Array();
	shuju=data;
	var json=[];
	for(var i=0;i<shuju.length;i++){
		var noteTitle=shuju[i].noteTitle;
		var status=shuju[i].status;
		var userName=shuju[i].userName;
		var addtime=note.paseDate(shuju[i].addtime);
		var newReplayUser=shuju[i].newReplayUser;
		var newTime=note.paseDate(shuju[i].newTime);
		var str={
				"noteTitle":noteTitle,
				"userName":userName+"<br/><font size='2pt' color='#888888'>"+addtime+"</font>",
				"newReplayUser":newReplayUser+"<br/><font size='2pt' color='#888888'>"+newTime+"</font>"
		};
		json.push(str);
	}
	return json;
}

note.paseDate=function(date){
	var time=new Date(date);
	var year=time.getFullYear();
	var month=note.padleft0(time.getMonth());
	var day=note.padleft0(time.getDay());
	var hour=note.padleft0(time.getHours());
	var minute=note.padleft0(time.getMinutes());
	var second=note.padleft0(time.getSeconds());
	return year+"-"+month+"-"+day+" "+hour + ":" + minute + ":" + second ;
}

//补齐两位数
note.padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}