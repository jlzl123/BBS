var noteDetil = {
	Data : []
}

$(document).ready(function() {
	var jsonReplay;//查询inReplay信息的json数据
	noteDetil.getReplayData();
	noteDetil.sendReplay();
})

noteDetil.initDatagrid = function() {
	$("#tt")
			.datagrid(
					{
						nowrap : false,// 自动换行
						pagination : true,
						data : noteDetil.Data.slice(0, 10),
						rowStyler : function(index, row) {
							return 'height:300px';
						},
						onClickRow : function(rowIndex, rowData) {
							$(this).datagrid('unselectRow', rowIndex);// 取消点击表格选中事件
							var replayUser=rowData.userName;
							var replayContent=rowData.replayContent
							var noteTitle=$("#param1").text();
							jsonReplay={
									"replayUser":replayUser,
									"replayContent":replayContent,
									"noteTitle":noteTitle
							}
							
						},					
						onLoadSuccess : function(data) {
							var panel = $(this).datagrid('getPanel');
							var tr = panel.find('div.datagrid-body tr');
							tr.each(function() {
								var alltd = $(this).children('td');
								alltd.children('div').css({
									"text-align" : "left",
									"font-size" : "12pt",
									"line-height" : "30px",
								});
							});
						},
						columns : [ [
								{
									field : 'userName',
									title : '回复人',
									width : 200,
									formatter : function(value, row, index) {
	//									var louzhu;
										if (index == 0) {
	//										louzhu = value;
											return "楼主:<font color='blue'>"
													+ value
													+ "</font><br/>发表时间:<br/>"
													+ noteDetil
															.paseDate(row.replayTime);
										} else if (row) {
											return value
													+ "<br/>回复时间:<br/>"
													+ noteDetil
															.paseDate(row.replayTime);
										}
									}
								},
								{
									field : 'replayContent',
									title : '回复内容',
									width : 1100,
									styler : function(value, row, index) {
										return 'vertical-align:text-top;';// 设置内容居上
									},
									formatter : function(value, row, index) {
										if (index == 0) {
											return value
													+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
													+ index+ 1
													+ "楼&nbsp;&nbsp;<a id='huifu'>回复("
													+ 1
													+ ")</a><a id='colseReplay'>收起回复</a></div>"
													+"<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table></div>"
										} else if (row) {
											return value
											+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
											+ index+ 1
											+ "楼&nbsp;&nbsp;<a id='huifu' class='huifu'>回复("
											+ 1
											+ ")</a><a id='colseReplay'>收起回复</a></div>"
											+"<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table></div>"
										}
									}
								} ] ]
					});

	var pager = $("#tt").datagrid("getPager");
	pager.pagination({
		total : noteDetil.Data.length,
		layout : [ 'list', 'sep', 'first', 'prev', 'links', 'next', 'last',
				'efresh', 'manual' ],
		onSelectPage : function(pageNo, pageSize) {
			var start = (pageNo - 1) * pageSize;
			var end = start + pageSize;
			$("#tt").datagrid('loadData', noteDetil.Data.slice(start, end));
			pager.pagination('refresh', {
				total : noteDetil.Data.length,
				pageNumber : pageNo
			});
		}
	});
}

noteDetil.getReplayData = function() {
	var noteTitle = $("#param1").text();
	$.ajax({
		type : "GET",
		url : "/BBS/userControl/findReplay?noteTitle=" + noteTitle,
		success : function(data) {
			if (data == "查询帖子信息异常!" || data == "查询所有回复信息异常!") {
				$.messager("错误", data, "warning");
			} else {
				noteDetil.Data = data;
				noteDetil.initDatagrid();
				noteDetil.initInRepleyDate();
//				noteDetil.oneselfClick();
			}
		}
	});
}

// 解析时间字符串
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

// 补齐两位数
noteDetil.padleft0 = function(obj) {
	return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

noteDetil.sendReplay = function() {
	$("#sendReplay").click(
			function() {
				var replayContent = $("#replayContent").val();
				var username = $("#font").text();
				var noteTitle = $("#param1").text();
				var json = {
					"replayContent" : replayContent,
					"noteTitle" : noteTitle,
					// "userName":username,
					"replayTime" : new Date()
				}
				if (replayContent != null) {
					$.ajax({
						type : "POST",
						url : "/BBS/userControl/addReplay",
						dataType : "text",
						data : JSON.stringify(json),
						contentType : "application/json;charset=utf-8",
						success : function(data) {
							if (data == "success") {
								$.messager.alert("成功", "回复成功");
								noteDetil.getReplayData();
							} else if (data == "noLogin") {
								$.messager.alert("错误", "您还未登录，请先登录！", "error");
							} else if (data == "查询帖子信息异常!"
									|| data == "添加回复信息异常!"
									|| data == "更新帖子信息异常!") {
								$.messager.alert("错误", data, "warning");
							}
						}
					});
				}
			});
}

noteDetil.initInRepleyDate = function() {
	$(".huifu").click(function() {//click先出发,onClickRow后出发，jsonReplay没赋值
		alert(12)
		$("#huifuDiv").onClick=function(){
		}
		$("#huifuDiv").click();//自动单击一次
		noteDetil.getInReplayDate();
		$("#huifu").css('display', "none");
		$("#colseReplay").css('display', "block");
		$("#inreplayDiv").slideDown("slow");
		$("#ttt").datagrid({
			columns:[[
			          {
			        	  field:"inReplay"
			          }]]
		});
	});
	$("#colseReplay").click(function() {
		$("#huifu").css('display', "block");
		$("#colseReplay").css('display', "none");
		$("#inreplayDiv").slideUp("slow");
	});
}

noteDetil.getInReplayDate=function(){
	$.ajax({
		type:"POST",
		url:"/BBS/userControl/findAllInReplay",
		dataType:"json",
		data:JSON.stringify(jsonReplay),
		contentType:"application/json;charset=utf-8",
		success:function(data){
			alert(JSON.stringify(data))
		}
	});
}

//表格初始化时单击一次,用来加载数据
noteDetil.oneselfClick=function(){
	$("#huifuDiv").onClick=function(){
	}
}