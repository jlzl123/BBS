var index={
		Data:[]
}

$(document).ready(function(){
	index.setSeach();
	index.getSectionData();
	index.initDatagrid();
})

index.setSeach=function(){
	$('#ss').searchbox({ 
		searcher:function(value,name){ 
		alert(value + "," + name) 
		}, 
		menu:'#mm', 
		prompt:'请输入值' 
		});
}

//初始化版块数据
index.initDatagrid=function(){
	$("#tt").datagrid({
		pagination:true,//分页
		pageSize:5,
		pageList:[5,10,15,20], 
		data:index.Data.slice(0, 10),
		rowStyler:function(index,row){
			return 'height: 50px;';
		}
	});
}

//获得版块数据
index.getSectionData=function(){
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllSection",
		success:function(data){
			index.Data=data;
		}
	});
}