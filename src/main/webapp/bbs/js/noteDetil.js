var noteDetil={
		Data:[]
}

$(document).ready(function(){
	noteDetil.getReplayData();
})

noteDetil.initDatagrid=function(){
	$("#tt").datagrid({
		
		data:noteDetil.Data,
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
					"font-size":"20pt",
					"padding-top":"10px",
				});
			});
		},
		columns:[[
		          {field:'userName',title:'回复人',width:200,
		        	  formatter:function(value,row,index){
		      			if(value=="admin"){
		      				return "<font color='red'>"+value+"<font>";
		      			}
		      		}
		          },
		          {field:'replayContent',title:'恢复内容',width:1000}
		          ]]
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