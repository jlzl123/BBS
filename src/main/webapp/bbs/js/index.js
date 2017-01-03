var index={
		Data:[]
}

$(document).ready(function(){
	index.setSeach();
	index.getSectionData();
	index.onClickListener();
})

//搜索框
index.setSeach=function(){
	$('#ss').searchbox({ 
		searcher:function(value,name){ //搜索时调用
			if(value.trim()==""){
				$.messager.alert("错误","请输入搜素内容","warning");
			}else{
				if(name=="sectionName"){
					var sectionName=value.trim();
					$.get("/BBS/userControl/findAllSectionBySectionName",{"sectionName":sectionName},
							function(data){
						if(data.length>0){
							$("#tt").datagrid("loadData",data);					
						}else{
							$.messager.alert("提示","您搜素内容不存在!","warning");
						}
					});
				}else if(name=="noteTitle"){
					var noteTitle=value.trim();
					$.get("/BBS/userControl/findAllNoteByNoteTitle",{"noteTitle":noteTitle},
							function(data){
						if(data.length>0){
							$("#ttDiv").css("display","none");
							$("#tDiv").css("display","block");
							$("#t").css("display","block");
							index.initNoteDatagrid(data);
						}else{
							$.messager.alert("提示","您搜素内容不存在!","warning");
						}
					})
				}else if(name=="userName"){
					var userName=value.trim();
					$.get("/BBS/userControl/findAllNoteByUserName",{"userName":userName},
							function(data){
						if(data.length>0){
							$("#ttDiv").css("display","none");
							$("#t").css("display","block");
							index.initNoteDatagrid(data);
						}else{
							$.messager.alert("提示","您搜素内容不存在!","warning");
						}
					})
				}else if(name=="newTime"){
					
				}
			}
		}, 
		menu:'#mm', 
		prompt:'请输入值' 
		});
}

index.onClickListener=function(){
	$("#newTime").click(function(){
//			var tb=$("#ss").searchbox("textbox");
//		$("#ss").searchbox("setValue","abc");
//		$(".textbox-value").attr("type","block")
		$("#dt").datetimebox({
		    required: true,
		    showSeconds: true,
		    value:index.paseDate(new Date())
		});
//		$("#dt").css("display","block");
	});

//	$("#noteTitle").click(function(){	
//		alert(2)
//	});
}

//解析时间字符串
index.paseDate=function(date){
	var time=new Date(date);
	var year=time.getFullYear();
	var month=index.padleft0(time.getMonth()+1);
	var day=index.padleft0(time.getDate());
	var hour=index.padleft0(time.getHours());
	var minute=index.padleft0(time.getMinutes()-10);
	var second=index.padleft0(time.getSeconds());
	return year+"-"+month+"-"+day+" "+hour + ":" + minute + ":" + second ;
}

//补齐两位数
index.padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}


//初始化版块数据
index.initDatagrid=function(){
	$("#tt").datagrid({
		fitColumns:true,//防止水平滚动
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

//datagrid宽度适应窗口大小
index.fixWidth=function(percent){
	return document.body.clientWidth*percent;
}

//初始化note表格数据
index.initNoteDatagrid=function(Data){
	$("#t").datagrid({
		fitColumns:true,//防止水平滚动
		pagination:true,
		data:Data.slice(0, 10),
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
		},
		onClickCell:function(index,field,value){//单击单元格是触发
			if(field=="noteTitle"){
				$.get("/BBS/userControl/findSectionNameBynoteTitle",{"noteTitle":value},
						function(data){
					if(data=="查询版快信息异常!"){
						$.messager.alert("错误",data,"error");
					}else{
					   var sectionName=data;
					   window.location.href="/BBS/bbs/noteDetil.jsp?noteTitle="+value+"&sectionName="+sectionName;
					}
				});
			}
		}
	});
	
	var pager=$("#t").datagrid("getPager");
	pager.pagination({
		total:note.Data.length,
		layout : ['list','sep','first','prev','links','next','last','efresh','manual'],
		onSelectPage:function(pageNo,pageSize){
			var start=(pageNo-1)*pageSize;
			var end=start+pageSize;
			$("#t").datagrid('loadData',Data.slice(start, end));
			pager.pagination('refresh',{
				total:note.Data.length,
				pageNumber:pageNo
			});
		}
	});
}
