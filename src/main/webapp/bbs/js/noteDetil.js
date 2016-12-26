var noteDetil={
		Data:[]
}

$(document).ready(function(){
	noteDetil.getReplayData();
	noteDetil.sendReplay();
})

noteDetil.initDatagrid=function(){
	$("#tt").datagrid({
		nowrap:false,//自动换行
		pagination:true,
		data:noteDetil.Data.slice(0, 10),
		rowStyler:function(index,row){
			return 'height:300px';
		},
		onLoadSuccess:function(data){
			var panel=$(this).datagrid('getPanel');
			var tr=panel.find('div.datagrid-body tr');
			tr.each(function(){
				var alltd=$(this).children('td');
				alltd.children('div').css({
					"text-align":"left",
					"font-size":"12pt",
					"line-height":"30px",
				});
			});
		},
		columns:[[
		          {field:'userName',title:'回复人',width:200,
		        	  formatter:function(value,row,index){
		      			if(row){
		      				return value+"<br/>回复时间:<br/>"+noteDetil.paseDate(row.replayTime);
		      			}
		      		}
		          },
		          {field:'replayContent',title:'恢复内容',width:1100,
		        	  styler: function(value,row,index){  
                          return 'vertical-align:text-top;';//设置内容居上  
                  }}
		          ]]
	});
	
	var pager=$("#tt").datagrid("getPager");
	pager.pagination({
		total:noteDetil.Data.length,
		layout : ['list','sep','first','prev','links','next','last','efresh','manual'],
		onSelectPage:function(pageNo,pageSize){
			var start=(pageNo-1)*pageSize;
			var end=start+pageSize;
			$("#tt").datagrid('loadData',noteDetil.Data.slice(start, end));
			pager.pagination('refresh',{
				total:noteDetil.Data.length,
				pageNumber:pageNo
			});
		}
	});
}

noteDetil.getReplayData=function(){
	var noteTitle=$("#param1").text();
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findReplay?noteTitle="+noteTitle,
		success:function(data){
			noteDetil.Data=data;
			noteDetil.initDatagrid();
		}
	});
}

//解析时间字符串
noteDetil.paseDate=function(date){
	var time=new Date(date);
	var year=time.getFullYear();
	var month=noteDetil.padleft0(time.getMonth()+1);
	var day=noteDetil.padleft0(time.getDate());
	var hour=noteDetil.padleft0(time.getHours());
	var minute=noteDetil.padleft0(time.getMinutes());
	var second=noteDetil.padleft0(time.getSeconds());
	return year+"-"+month+"-"+day+" "+hour + ":" + minute + ":" + second ;
}

//补齐两位数
noteDetil.padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

noteDetil.sendReplay=function(){
	$("#sendReplay").click(function(){
		var replayContent=$("#replayContent").val();
		var username=$("#font").text();
		var noteTitle=$("#param1").text();
		var json={
				"replayContent":replayContent,
				"noteTitle":noteTitle,
//				"userName":username,
				"replayTime":new Date()
		}
		if(replayContent!=null){
			$.ajax({
				type:"POST",
				url:"/BBS/userControl/addReplay",
				dataType:"text",
				data:JSON.stringify(json),
				contentType:"application/json;charset=utf-8",
				success:function(data){
					if(data=="success"){
						$.messager.alert("成功","回复成功");
						noteDetil.getReplayData();
					}else if(data=="noLogin"){
						$.messager.alert("错误","您还未登录，请先登录！","error");
					}
				}
			});
		}
	});
}