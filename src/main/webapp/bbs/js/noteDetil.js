var noteDetil = {
	Data : []
}

$(document).ready(function() {
	var jsonReplay;//查询inReplay信息的json数据
	var inReplayToUser;
	noteDetil.getReplayData();
	noteDetil.sendReplay();
})

noteDetil.initDatagrid = function() {
	var pageNoumber=1;
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
							var replayUser = rowData.userName;
							var replayContent = rowData.replayContent
							var noteTitle = $("#param1").text();
							jsonReplay = {
								"replayUser" : replayUser,
								"replayContent" : replayContent,
								"noteTitle" : noteTitle
							}
							noteDetil.initInRepleyDate();
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
										var number=(pageNoumber-1)*10+index;//pageNoumber默认为1
										if (number == 0) {
											return value
													+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
													+ parseInt(number + 1)
													+ "楼&nbsp;&nbsp;<a id='huifu1'>回复"
													+ "</a></div>"

										} else if (row) {
											if (row.inReplayTotal != 0) {			                                 
												return value
														+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
														+ parseInt(number + 1)
														+ "楼&nbsp;&nbsp;<a id='huifu' class='huifu'>回复("
														+ row.inReplayTotal
														+ ")</a><a id='colseReplay' class='colseReplay'>收起回复</a></div>"
														+ "<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table>"
														+ "<div class='button'>我也说一句</div><div class='textDiv'><input type='text' class='text'>"
														+ "<br/><button class='replayIn' onclick='noteDetil.inReplayonClick(this)'>回复</button></div></div>"
											} else {
												return value
														+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
														+ parseInt(number + 1)
														+ "楼&nbsp;&nbsp;<a id='huifu' class='huifu'>回复"
														+ "</a><a id='colseReplay' class='colseReplay'>收起回复</a></div>"
														+ "<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table>"
														+ "<div class='button'>我也说一句</div><div><input type='text' class='text'>"
														+ "<br/><button class='replayIn'>回复</button></div></div>"
											}
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
			pageNoumber=pageNo;
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
	var danji;
	$(".huifu").click(function() {//click先出发,onClickRow后出发，jsonReplay没赋值
		$(this).parent().onClick = function() {
		}
		$(this).parent().click();//自动单击一次
		danji=$(this).parent();
		var dg = $(this).parent().next().children("table")
		$(this).css('display', "none");
		$(this).next().css('display', "block");
		$(this).parent().next().slideDown("slow");
		noteDetil.getInReplayDate(dg);	
	});
	$(".colseReplay").click(function() {
		$(this).prev().css('display', "block");
		$(this).css('display', "none");
		$(this).parent().next().slideUp("slow");
	});
	$("#huifu1").click(function() {
		scrollTo(0, document.body.scrollHeight)//页面滚动到底部
	});

	$(".button").click(function(){
		danji.click();
		var value=$(this).next().css("display");		
		if(value=="none"){
			$(this).next().css("display","block");			
		}
		if(value=="block"){		
			$(this).next().css("display","none");
		}
	});
	$(".button").mouseover(function(){
		$(this).css("color","blue");
		$(this).css("border-color","blue");
	});
	$(".button").mouseout(function(){
		$(this).css({"color":"black","border-color":"#FFFFFF","border": "solid 1px"});
	});
//	$(".replayIn").click(function(){
//		alert($(this).prev().val())
//	});
}

noteDetil.getInReplayDate = function(object) {
	$.ajax({
		type : "POST",
		url : "/BBS/userControl/findAllInReplay",
		dataType : "json",
		data : JSON.stringify(jsonReplay),
		contentType : "application/json;charset=utf-8",
		success : function(data) {
			if (data.length > 0) {
				object.datagrid({
					nowrap : false,// 自动换行
					width : "600px",
					pagination : true,
					pageList : [ 5 ], //每页
					pageSize : 5,
					rowStyler : function(index, row) {
						return 'height:50px';
					},
					onClickRow:function(index,row){
						//split用指定字符分割字符串，取分割后的第一个元素即使用户名
						inReplayToUser=row.inReplay.split(":")[0]
						$(".minReplay").click(function(){
//							$(".minReplay").parent().onClick = function() {
//							}
//							$(this).click();//自动单击一次
							var ob=$(this).parents("#inreplayDiv").children(".textDiv");
							ob.css("display","block");
							ob.children("input").val("  回复 "+inReplayToUser+" :");
						});
					},
					columns : [ [ {
						field : "inReplay",
						title : "<font size='3'>楼层回复内容</font>",
						width : "560px",
					} ] ]
				});
				var Data = noteDetil.paseInReplayDate(data);
				object.datagrid('loadData', Data.slice(0, 5));
				var pager = object.datagrid("getPager");
				pager.pagination({
					total : Data.length,
					layout : [ 'sep', 'first', 'prev', 'links', 'next', 'last',
							'efresh', 'manual' ],
					onSelectPage : function(pageNo, pageSize) {//改变页面是触发
						var start = (pageNo - 1) * pageSize;
						var end = start + pageSize;
						object.datagrid('loadData', Data.slice(start, end));
						pager.pagination('refresh', {
							total : Data.length,
							pageNumber : pageNo
						});
					}
				});
			}
		}
	});

}

noteDetil.paseInReplayDate = function(data) {
	var shuju = new Array();
	if (data != null) {
		for (var i = 0; i < data.length; i++) {
			var inReplayContent = data[i].inReplayContent;
			var inReplayUser = data[i].inReplayUser;
			var inReplayToUser = data[i].inReplayToUser;
			var inReplayTime = noteDetil.paseDate(data[i].addtime);
			var str = {
				"inReplay" : inReplayUser + ":&nbsp;回复&nbsp;" + inReplayToUser
						+ "&nbsp;:" + inReplayContent
						+ "<br/><div class='inReplayTimeDiv'><a>"
						+ inReplayTime
						+ "</a>&nbsp;&nbsp;<a class='minReplay'>回复</a></div>"
			}
			shuju.push(str);
		}
	}
	return shuju;
}

//表格初始化时单击一次,用来加载数据
noteDetil.oneselfClick = function() {
	$("#huifuDiv").onClick = function() {
	}
}

noteDetil.inReplayonClick=function(object){
//	alert($(object).prevAll("input").val())
	var replayUser=jsonReplay.replayUser;
	var replayContent=jsonReplay.replayContent;
	var noteTitle=$("#param1").text();
	var inReplayToUser;
	var inReplayContent;
	$.ajax({
		type:"POST",
		url:"/BBS/userControl/validateIsLogined",
		dataType:"text",
		success:function(data){
			if(data!="T"){
				var inReplayUser=data;
				var text=$(object).prevAll("input").val();
				if(text.trim()!=""){
					var hf=JSON.stringify(text).substring(2,5);
					if(text.split(":")[1].trim()==""){
						$.messager.alert("错误","请输入回复内容!","warning");
					}else {
						if(hf.trim()=="回复"){
							var i=JSON.stringify(text).indexOf(":");
							inReplayToUser=JSON.stringify(text).substring(5,i).trim();
							var last=JSON.stringify(text).length;
							inReplayContent=JSON.stringify(text).substring(i+1,last-1).trim()
						}else{					
							inReplayToUser=replayUser;
							inReplayContent=text.trim();
						}
						var str={
								"inReplayContent":inReplayContent,
								"noteTitle":noteTitle,
								"replayUser":replayUser,
								"replayContent":replayContent,
								"inReplayUser":inReplayUser,
								"inReplayToUser":inReplayToUser,
								"addtime":new Date()
						}
						$.ajax({
							type:"POST",
							url:"/BBS/userControl/addInReplay",
							dataType:"text",
							data:JSON.stringify(str),
							contentType:"application/json,charset=utf-8",
							success:function(data){
								if(data=="success"){
									$.messager.alert("成功","回复成功!","info");
								}else if(data=="error"){
									$.messager.alert("错误","回复失败!","error");
								}
							}
						});					
					}
				}else{
					$.messager.alert("错误","请输入回复内容!","warning");
				}
				
			}
		},
	    error:function(xhr,status,error){
	    	$.messager.alert("错误",xhr,"error");
	    	$.messager.alert("错误",status,"error");
	    	$.messager.alert("错误",error,"error");
	    }
	});
}