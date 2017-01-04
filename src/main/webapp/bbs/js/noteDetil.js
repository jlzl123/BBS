var noteDetil = {
	Data : []
}

$(document).ready(function() {
	var jsonReplay;//查询inReplay信息的json数据
	noteDetil.getReplayData();
	noteDetil.sendReplay();
    noteDetil.sectionHT();
})

//初始化帖子回复数据
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
										if (index == 0) {
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
														+ "楼&nbsp;&nbsp;<a id='huifu' class='uifu' onclick='noteDetil.replayonClick(this)'>回复("
														+ row.inReplayTotal
														+ ")</a><a id='colseReplay' class='olseReplay' onclick='noteDetil.colseReplayonClick(this)'>收起回复</a></div>"
														+ "<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table>"
														+ "<div class='button' onclick='noteDetil.buttononClick(this)'>我也说一句</div><div class='textDiv'><input type='text' class='text'>"
														+ "<br/><button class='replayIn' onclick='noteDetil.inReplayonClick(this)'>回复</button></div></div>"
											} else {
												return value
														+ "<div id='huifuDiv'><a id='jubao'>举报</a>|"
														+ parseInt(number + 1)
														+ "楼&nbsp;&nbsp;<a id='huifu' class='uifu' onclick='noteDetil.replayonClick(this)'>回复"
														+ "</a><a id='colseReplay' class='olseReplay' onclick='noteDetil.colseReplayonClick(this)'>收起回复</a></div>"
														+ "<div id='inreplayDiv'><table id='ttt' class='easyui-datagrid'></table>"
														+ "<div class='button' onclick='noteDetil.buttononClick(this)'>我也说一句</div><div><input type='text' class='text'>"
														+ "<br/><button class='replayIn' onclick='noteDetil.inReplayonClick(this)'>回复</button></div></div>"
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

//获得帖子回复数据
noteDetil.getReplayData = function() {
	var noteTitle = $("#param1").text();
	$.ajax({
		type : "GET",
		url : "/BBS/userControl/findReplay?noteTitle=" + noteTitle,
		success : function(data) {
			if (data == "查询帖子信息异常!" || data == "查询所有回复信息异常!") {
				$.messager.alert("错误", data, "warning");
			} else {
				noteDetil.Data = data;
				noteDetil.initDatagrid();
				noteDetil.initInRepleyDate();
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
				if (replayContent.trim()!="" ) {
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
				}else{
					$.messager.alert("错误", "请输入内容!", "warning");
				}
			});
}

//显示楼层回复
noteDetil.replayonClick=function(object){
	var danji;
//	$(object).click(function() {//click先出发,onClickRow后出发，jsonReplay没赋值
		$(object).parent().onClick = function() {
		}
		$(object).parent().click();//自动单击一次
		danji=$(object).parent();
		var dg = $(object).parent().next().children("table")
		$(object).css('display', "none");
		$(object).next().css('display', "block");
		$(object).parent().next().slideDown("slow");
		noteDetil.getInReplayDate(dg);	
//	});
}

//关闭楼层回复
noteDetil.colseReplayonClick=function(object){
		$(object).prev().css('display', "block");
		$(object).css('display', "none");
		$(object).parent().next().slideUp("slow");

}

//回复框触发事件
noteDetil.buttononClick=function(object){
		var value=$(object).next().css("display");	
		if(value=="none"){
			$(object).next().css("display","block");			
		}
		if(value=="block"){		
			$(object).next().css("display","none");
		}

}

//楼层回复按钮触发事件
noteDetil.minReplayClick=function(object){
	var str=$(object).parent().parent().text();
	var inReplayToUser=str.split(":")[0]
	var ob=$(object).parents("#inreplayDiv").children(".textDiv");
	ob.css("display","block");
	ob.children("input").val("  回复 "+inReplayToUser+" :");
}

noteDetil.initInRepleyDate = function() {

	$("#huifu1").click(function() {
		scrollTo(0, document.body.scrollHeight)//页面滚动到底部
	});

	$(".button").mouseover(function(){
		$(this).css("color","blue");
		$(this).css("border-color","blue");
	});
	$(".button").mouseout(function(){
		$(this).css({"color":"black","border-color":"#FFFFFF","border": "solid 1px"});
	});
}

//初始化楼层回复数据
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
					fitColumns:true,//防止水平滚动
					nowrap : false,// 自动换行
					width : "600px",
					pagination : true,
					pageList : [ 5 ], //每页
					pageSize : 5,
					rowStyler : function(index, row) {
						return 'height:50px';
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
					onSelectPage : function(pageNo, pageSize) {//改变页面时触发
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

//解析楼层内回复的数据为指定的格式显示
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
						+ "</a>&nbsp;&nbsp;<a class='minReplay' onclick='noteDetil.minReplayClick(this)'>回复</a></div>"
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

//发送回复信息
noteDetil.inReplayonClick=function(object){
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
			if(data!="T"){//验证用户是否已登录
				var inReplayUser=data;
				var text=$(object).prevAll("input").val();
				if(text.trim()!=""){//判断回复内容不为空
					var hf=JSON.stringify(text).substring(2,5);
					var flag=text.split(":")[1]==null;
					if(!flag&&text.split(":")[1].trim()==""){//判断回复后面的内容不为空
						$.messager.alert("错误","请输入回复内容!","warning");
					}else {//回复内容不为空
						if(hf.trim()=="回复"){//回复层主
							var i=JSON.stringify(text).indexOf(":");
							inReplayToUser=JSON.stringify(text).substring(5,i).trim();
							var last=JSON.stringify(text).length;
							inReplayContent=JSON.stringify(text).substring(i+1,last-1).trim()
						}else{//回复用户					
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
						$.ajax({//添加回复信息
							type:"POST",
							url:"/BBS/userControl/addInReplay",
							dataType:"text",
							data:JSON.stringify(str),
							contentType:"application/json,charset=utf-8",
							success:function(data){
								if(data=="success"){
									$.messager.alert("成功","回复成功!","info");
									noteDetil.getInReplayDate($(object).parent().prev().prev())
								}else if(data=="error"){
									$.messager.alert("错误","回复失败!","error");
								}
							}
						});					
					}
				}else{
					$.messager.alert("错误","请输入回复内容!","warning");
				}			
			}else{
				$.messager.alert("错误", "您还未登录，请先登录！", "error");
			}
		},
	    error:function(xhr,status,error){
	    	$.messager.alert("错误",xhr,"error");
	    	$.messager.alert("错误",status,"error");
	    	$.messager.alert("错误",error,"error");
	    }
	});
}

noteDetil.sectionHT=function(){
	$("#param2").mouseover(function(){
		$(this).css({"color":"blue","font-size":"18px"});
	});
	$("#param2").mouseout(function(){
		$(this).css({"color":"white","font-size":"16px"});
	});
	$("#param2").click(function(){
		var sectionName=$(this).text();
		window.location.href="/BBS/bbs/note.jsp?sectionName="+sectionName;
	});
}