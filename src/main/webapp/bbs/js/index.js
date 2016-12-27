var index={
		Data:[]
}

$(document).ready(function(){
	index.setSeach();
	index.getSectionData();
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
		data:index.Data.slice(0, 5),
		rowStyler:function(index,row){//改变行css
			return 'height: 100px;';
		},
		onLoadSuccess:function(data){//设置表格样式
			var panel=$(this).datagrid('getPanel');//返回面板对象。
			var tr=panel.find('div.datagrid-body tr');
			tr.each(function(){
				var td=$(this).children('td[field="sectionName"]');
				td.children("div").css({				
				    "font-size":"12pt",
				    "cursor":"pointer"
				});			
			});
		},
	    onClickRow:function(index,row){//单机行是触发	
	    	var sectionName=row.sectionName;
//	    	$.get("/BBS/userControl/findAllNoteBySectionId",{"sectionName":sectionName});
	    	//页面跳转重定向
	    	window.location.href="/BBS/bbs/note.jsp?sectionName="+sectionName;
//	    	$(this).datagrid('unselectRow', rowIndex);//取消点击表格选中事件
	    }
		
	});
	//分页显示
	var pager=$("#tt").datagrid("getPager");//返回页面对象。
	pager.pagination({
		total:index.Data.length,
		layout : ['list','sep','first','prev','links','next','last','efresh','manual'],//设置表下方的分页标签
		onSelectPage:function(pageNo,pageSize){
			var start=(pageNo-1)*pageSize;//加载第pageNo也数据开始位置
			var end=start+pageSize;//结束位置
			$("#tt").datagrid("loadData",index.Data.slice(start, end));
			pager.pagination('refresh',{
				total:index.Data.length,
				pageNumber:pageNo
			});
		}
	});
}

//获得版块数据
index.getSectionData=function(){
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findAllSection",
		success:function(data){
			if(data=="查询所有版本信息异常!"){
				$.messager.alert("错误",data,"warning");
			}else{
				index.Data=data;
				index.initDatagrid();			
			}
		}
	});
}