var admin = {
	Data : []
}

$(document).ready(function() {
	admin.clickListener();
	$("#userAdmin").click();
})

admin.clickListener = function() {
	$("#userAdmin").click(function() {
		$("#userAdminDiv").css("display", "block");
		$("#noteAdminDiv").css("display", "none");
		$("#sectionAdminDiv").css("display", "none");
		$("#changePassDiv").css("display","none");
		$(".input-group").css("display", "none");
		$(".sectionAddDiv").css("display", "none");
		$("#tag").text("用户列表");
		$("#guanli").text("用户管理");
		admin.initUserData();

	});
	$("#noteAdmin").click(function() {
		$("#noteAdminDiv").css("display", "block");
		$("#userAdminDiv").css("display", "none");
		$("#sectionAdminDiv").css("display", "none");
		$("#changePassDiv").css("display","none");
		$(".input-group").css("display", "");// 设置block css会错误
		$(".sectionAddDiv").css("display", "none");
		$("#tag").text("文章列表");
		$("#guanli").text("文章管理");
		admin.initNoteData();
	});
	$("#sectionAdmin").click(function() {
		$("#sectionAdminDiv").css("display", "block");
		$("#noteAdminDiv").css("display", "none");
		$("#userAdminDiv").css("display", "none");
		$(".input-group").css("display", "none");
		$("#changePassDiv").css("display","none");
		$(".sectionAddDiv").css("display", "block");
		//设置选择框
		$.ajax({
			type:"POST",
			url:"/BBS/adminControl/findAllUser",
			dataType:"json",
			data:"pageIndex="+1,
			success:function(data){
				var str="";
				$.each(data.list,function(index,item){
					str+='<option>'+item.username+'</option>';
				});
				$("#su").html(str);
			}
		});
		$("#tag").text("版块列表");
		$("#guanli").text("版块管理");
		admin.initSectionData();
	});
	$("#changePass").click(function() {
		$("#changePassDiv").css("display","block");
		$("#sectionAdminDiv").css("display", "none");
		$("#noteAdminDiv").css("display", "none");
		$("#userAdminDiv").css("display", "none");
		$(".input-group").css("display", "none");
		$(".sectionAddDiv").css("display", "none");
		$("#guanli").text("修改密码");
		$("#tag").text("修改管理员密码");
	});
	
	//添加版主
	$("#addSectionUser").click(function(){
		var sectionName=$("#name").val().trim();
		var jianjie=$("#jianjie").val().trim();
		var sectionUser=$("#su").val().trim();
		var str={
				"sectionName":sectionName,
				"jianjie":jianjie,
				"sectionUser":sectionUser,
				"addtime":new Date()
		}
		if(sectionName==""){
			alert("请输入版块名");
		}else if(jianjie==""){
			alert("请输入版块简介");
		}else if(sectionUser==""){
			alert("请输入版块管理员");
		}else if($("#nameError").css("display")=="block"){
            alert("版块已存在，请修改");
		}else{
			$.ajax({
				type:"POST",
				url:"/BBS/adminControl/addSectiom",
				data:JSON.stringify(str),
				success:function(data){
					if(data){
						alert("版块已添加");
						admin.initSectionData();
					}else{
						alert("操作错误");
					}
				}
			});
		}
	});
	//版块名是否存在
	$("#name").change(function(){
		var sectionName=$("#name").val().trim();
		$.ajax({
			type:"GET",
			url:"/BBS/adminControl/findSectionBySectionName",
			data:"sectionName="+sectionName,
			success:function(data){
				if(data){
					$("#nameError").css("display","block");
				}else{
					$("#nameError").css("display","none");
				}
			}
		});
	});
	//修改管理员密码
	$("#changeAdminPass").click(function(){
		var username=$("#adminuser").text().trim();
		var passwordOld=$("#passwordOld").val().trim();
		var password=$("#password").val().trim();
		var passwordConfirm=$("#passwordConfirm").val().trim();
		if(passwordOld==""||password==""||passwordConfirm==""){
			alert("密码密码不能为空!");
		}else if(password!=passwordConfirm){
			$(".passError").css("display","block");
		}else{
			$(".passError").css("display","none");
			$.ajax({
				type:"POST",
				url:"/BBS/adminControl/validateAdminPass",
				data:"password="+passwordOld+"&username="+username,
				success:function(data){
					if(data){
						$(".passwordError").css("display","none");	
						$.ajax({
							type:"POST",
							url:"/BBS/adminControl/changeAdminPass",
							data:"&password="+password+"&username="+username,
							success:function(data){
								if(data){
									alert("密码已修改")
								}else{
									alert("操作错误")
								}				
							}
						});
					}else{
						$(".passwordError").css("display","block");					
					}
				}
			});
		}
	});
	//退出后台管理并回到首页
	$("#tuichu").click(function(){
		window.location.href="/BBS/test/index.jsp";
	});
	
	// 筛选框监听,改变筛选方式
	$(".ss").click(function() {
		var str = $(this).text();
		$(this).parents("ul").prev().children("font").text(str);
	});
	$("#sousuo")
			.click(
					function() {
						var ssType = $(this).parents(".input-group").find(
								"font").text();
						var ssContent = $(this).parent().prev().val();
						if (ssType.trim() == "作者") {
							$
									.ajax({
										type : "GET",
										url : "/BBS/adminControl/findAllNoteByUser",
										data : "userName=" + ssContent
												+ "&pageIndex=" + 1,
										dataType : "json",
										success : function(data) {
											if (data.list.length > 0) {
												var str = "";
												$
														.each(
																data.list
																		.slice(
																				0,
																				10),
																function(index,
																		item) {
																	str += '<tr><td>'
																			+ item.noteId
																			+ '</td><td>'
																			+ item.userName
																			+ '</td><td>'
																			+ admin
																					.paseDate(item.addtime)
																			+ '</td>'
																			+ '<td>'
																			+ item.noteTitle
																			+ '</td><td>'
																			+ item.sectionName
																			+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																			+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																			+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																});
												$("#tbodyNote").html(str);

												var pageCount = data.pageCount;
												var currentPage = data.pageIndex;
												var options = {
													bootstrapMajorVersion : 3,
													currentPage : currentPage,
													totalPages : pageCount,
													numberOfPages : 5,
													itemTexts : function(type,
															page, current) {
														switch (type) {
														case "first":
															return "首页";
														case "prev":
															return "上一页";
														case "next":
															return "下一页";
														case "last":
															return "末页";
														case "page":
															return page;
														}
													},
													onPageClicked : function(
															event,
															originalEvent,
															type, page) {
														$
																.ajax({
																	type : "GET",
																	url : "/BBS/adminControl/findAllNoteByUser",
																	dataType : "json",
																	data : "userName="
																			+ ssContent
																			+ "&pageIndex="
																			+ page,
																	success : function(
																			data) {
																		var str = "";
																		$
																				.each(
																						data.list
																								.slice(
																										(page - 1) * 10,
																										(page - 1) * 10 + 10),
																						function(
																								index,
																								item) {
																							str += '<tr><td>'
																									+ item.noteId
																									+ '</td><td>'
																									+ item.userName
																									+ '</td><td>'
																									+ admin
																											.paseDate(item.addtime)
																									+ '</td>'
																									+ '<td>'
																									+ item.noteTitle
																									+ '</td><td>'
																									+ item.sectionName
																									+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																									+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																									+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																						});
																		$(
																				"#tbodyNote")
																				.html(
																						str);
																	}
																});
													}
												}
												$('#exampleNote')
														.bootstrapPaginator(
																options);
											} else {
												alert("内容未找到");
											}
										}
									});
						} else if (ssType.trim() == "帖子") {
							$
									.ajax({
										type : "GET",
										url : "/BBS/adminControl/findAllNoteByNoteTitle",
										data : "noteTitle=" + ssContent
												+ "&pageIndex=" + 1,
										dataType : "json",
										success : function(data) {
											if (data.list.length > 0) {
												var str = "";
												$
														.each(
																data.list
																		.slice(
																				0,
																				10),
																function(index,
																		item) {
																	str += '<tr><td>'
																			+ item.noteId
																			+ '</td><td>'
																			+ item.userName
																			+ '</td><td>'
																			+ admin
																					.paseDate(item.addtime)
																			+ '</td>'
																			+ '<td>'
																			+ item.noteTitle
																			+ '</td><td>'
																			+ item.sectionName
																			+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																			+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																			+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																});
												$("#tbodyNote").html(str);

												var pageCount = data.pageCount;
												var currentPage = data.pageIndex;
												var options = {
													bootstrapMajorVersion : 3,
													currentPage : currentPage,
													totalPages : pageCount,
													numberOfPages : 5,
													itemTexts : function(type,
															page, current) {
														switch (type) {
														case "first":
															return "首页";
														case "prev":
															return "上一页";
														case "next":
															return "下一页";
														case "last":
															return "末页";
														case "page":
															return page;
														}
													},
													onPageClicked : function(
															event,
															originalEvent,
															type, page) {
														$
																.ajax({
																	type : "GET",
																	url : "/BBS/adminControl/findAllNoteByNoteTitle",
																	dataType : "json",
																	data : "noteTitle="
																			+ ssContent
																			+ "&pageIndex="
																			+ page,
																	success : function(
																			data) {
																		var str = "";
																		$
																				.each(
																						data.list
																								.slice(
																										(page - 1) * 10,
																										(page - 1) * 10 + 10),
																						function(
																								index,
																								item) {
																							str += '<tr><td>'
																									+ item.noteId
																									+ '</td><td>'
																									+ item.userName
																									+ '</td><td>'
																									+ admin
																											.paseDate(item.addtime)
																									+ '</td>'
																									+ '<td>'
																									+ item.noteTitle
																									+ '</td><td>'
																									+ item.sectionName
																									+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																									+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																									+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																						});
																		$(
																				"#tbodyNote")
																				.html(
																						str);
																	}
																});
													}
												}
												$('#exampleNote')
														.bootstrapPaginator(
																options);
											} else {
												alert("内容未找到");
											}
										}
									});
						} else if (ssType.trim() == "版块") {
							$
									.ajax({
										type : "GET",
										url : "/BBS/adminControl/findAllNoteBySectionName",
										data : "sectionName=" + ssContent
												+ "&pageIndex=" + 1,
										dataType : "json",
										success : function(data) {
											if (data.list.length > 0) {
												var str = "";
												$
														.each(
																data.list
																		.slice(
																				0,
																				10),
																function(index,
																		item) {
																	str += '<tr><td>'
																			+ item.noteId
																			+ '</td><td>'
																			+ item.userName
																			+ '</td><td>'
																			+ admin
																					.paseDate(item.addtime)
																			+ '</td>'
																			+ '<td>'
																			+ item.noteTitle
																			+ '</td><td>'
																			+ item.sectionName
																			+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																			+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																			+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																});
												$("#tbodyNote").html(str);

												var pageCount = data.pageCount;
												var currentPage = data.pageIndex;
												var options = {
													bootstrapMajorVersion : 3,
													currentPage : currentPage,
													totalPages : pageCount,
													numberOfPages : 5,
													itemTexts : function(type,
															page, current) {
														switch (type) {
														case "first":
															return "首页";
														case "prev":
															return "上一页";
														case "next":
															return "下一页";
														case "last":
															return "末页";
														case "page":
															return page;
														}
													},
													onPageClicked : function(
															event,
															originalEvent,
															type, page) {
														$
																.ajax({
																	type : "GET",
																	url : "/BBS/adminControl/findAllNoteBySectionName",
																	dataType : "json",
																	data : "sectionName="
																			+ ssContent
																			+ "&pageIndex="
																			+ page,
																	success : function(
																			data) {
																		var str = "";
																		$
																				.each(
																						data.list
																								.slice(
																										(page - 1) * 10,
																										(page - 1) * 10 + 10),
																						function(
																								index,
																								item) {
																							str += '<tr><td>'
																									+ item.noteId
																									+ '</td><td>'
																									+ item.userName
																									+ '</td><td>'
																									+ admin
																											.paseDate(item.addtime)
																									+ '</td>'
																									+ '<td>'
																									+ item.noteTitle
																									+ '</td><td>'
																									+ item.sectionName
																									+ '( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																									+ '</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
																									+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
																						});
																		$(
																				"#tbodyNote")
																				.html(
																						str);
																	}
																});
													}
												}
												$('#exampleNote')
														.bootstrapPaginator(
																options);
											} else {
												alert("内容未找到");
											}
										}
									});
						} else {
							alert("请选择筛选条件");
						}
					});
}

admin.initUserData = function() {
	$.ajax({
				type : "POST",
				url : "/BBS/adminControl/findAllUser",
				dataType : "json",
				data : "pageIndex=" + 1,
				success : function(data) {
					var str = "";
					$.each(data.list.slice(0, 10),function(index, item) {
						str += '<tr><td class="userId">'
							+ item.userId
							+ '</td><td>'
							+ item.username
							+ '</td><td>'
							+ item.userType
							+ '( <a href="#" onclick="admin.updateUserTypeClick(this)">修改</a>)</td>'
							+ '<td>'
							+ admin.paseDate(item.addtime)
							+ '</td><td><a href="#" onclick="admin.removeUserClick(this)">删除</a></td>'
							+ '<td>'
							+ item.userStatusStr
							+ '(<a href="#" onclick="admin.updateUserClick(this)">禁言</a>)</td></tr>';
									});
					$("#tbodyUser").html(str);
					var pageCount = data.pageCount;
					var currentPage = data.pageIndex;

					var options = {
						bootstrapMajorVersion : 3,
						currentPage : currentPage,
						totalPages : pageCount,
						numberOfPages : 5,
						itemTexts : function(type, page, current) {
							switch (type) {
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						},
						onPageClicked : function(event, originalEvent, type,page) {
							$.ajax({
										type : "POST",
										url : "/BBS/adminControl/findAllUser",
										dataType : "json",
										data : "pageIndex=" + page,
										success : function(data) {
											var str = "";
											$.each(data.list.slice((page - 1) * 10,(page - 1) * 10 + 10),function(index,item) {
												str += '<tr><td class="userId">'
													+ item.userId
													+ '</td><td>'
													+ item.username
													+ '</td><td>'
													+ item.userType
													+ '( <a href="#" onclick="admin.updateUserTypeClick(this)">修改</a>)</td>'
													+ '<td>'
													+ admin.paseDate(item.addtime)
													+ '</td><td><a href="#" onclick="admin.removeUserClick(this)">删除</a></td>'
													+ '<td>'
													+ item.userStatusStr
													+ '(<a href="#" onclick="admin.updateUserClick(this)">禁言</a>)</td></tr>';
															});
											$("#tbodyUser").html(str);
										}
									});
						}
					}
					$('#exampleUser').bootstrapPaginator(options);
				}
			});
}

admin.removeUserClick = function(object) {
	var username=$(object).parents("tr").children().first().next().text();
	$("#user").text(username);
	$("#user").parent().next().children().last().attr("onclick","admin.removeUser(this)");
	$('#myModal').modal('show');
	var userId = $(object).parents("tr").children(".userId").text();
	$("#a").text(userId);
}

admin.removeUser = function(object) {
	var userId = $(object).prev().text();
	$.ajax({
		type : "GET",
		url : "/BBS/adminControl/removeUser",
		data : "userId=" + userId,
		success : function(data) {
			if (data) {
				alert("用户已删除");
				admin.initUserData();
			} else {
				alert("删除用户出错!");
			}
		}
	});
}

admin.updateUserClick = function(object) {
	var userId = $(object).parent().prevAll(".userId").html();// 必需在下面改变之前，否则object不存在了
	$(object).parent().html(
			'禁止发言(<a href="#" onclick="admin.huifuUserClick(this)">恢复</a>)');
	$.ajax({
		type : "POST",
		url : "/BBS/adminControl/updateUserStatus",
		data : "userStatus=" + 0 + "&userId=" + userId,
		success : function(data) {
			if (data) {
				alert("该用户已被禁言!");
			} else {
				alert("操作错误!");
			}
		}
	});
}

admin.huifuUserClick = function(object) {
	var userId = $(object).parent().prevAll(".userId").html();
	$(object).parent().html(
			'正常(<a href="#" onclick="admin.updateUserClick(this)">禁言</a>)');
	$.ajax({
		type : "POST",
		url : "/BBS/adminControl/updateUserStatus",
		data : "userStatus=" + 1 + "&userId=" + userId,
		success : function(data) {
			if (data) {
				alert("该用户已恢复正常!");
			} else {
				alert("操作错误!");
			}
		}
	});
}

admin.updateUserTypeClick = function(object) {
	var sectionUser = $(object).parent().prev().text();
	$("#banzhu").text(sectionUser);
	// 初始化版主管理版块表
	$
			.ajax({
				type : "GET",
				url : "/BBS/adminControl/findSectionBySectionUser",
				data : "sectionUser=" + sectionUser,
				dataType : "json",
				success : function(data) {
					if (data.length > 0) {// 版主
						$('#myModal1').modal('show');
						var str = "";
						$
								.each(
										data,
										function(index, item) {
											str += '<tr><td class="sectionId">'
													+ item.sectionId
													+ '</td><td>'
													+ item.sectionName
													+ '</td>'
													+ '<td>'
													+ admin
															.paseDate(item.addtime)
													+ '</td><td><a href="#" onclick="admin.removeUserSection(this)">删除</a></td></tr>';
										});
						$("#tbodyUserSection").html(str);
					} else {
						$('#myModal1').modal('show');
					}
				}
			});
	// 初始化暂定版块表
	$
			.ajax({
				type : "GET",
				url : "/BBS/adminControl/findNoUserSection",
				success : function(data) {
					if (data.length > 0) {
						var str = "";
						$
								.each(
										data,
										function(index, item) {
											str += '<tr><td class="sectionId">'
													+ item.sectionId
													+ '</td><td>'
													+ item.sectionName
													+ '</td>'
													+ '<td>'
													+ admin
															.paseDate(item.addtime)
													+ '</td><td><a href="#" onclick="admin.addUserSection(this)">添加</a></td></tr>';
										});
						$("#tbodyUserSection1").html(str);
					}
				}
			});

}

admin.removeUserSection = function(object) {
	var sectionId = $(object).parent().prevAll(".sectionId").text();
	$.ajax({
		type : "POST",
		url : "/BBS/adminControl/updateSectionUser",
		data : "sectionId=" + sectionId + "&sectionUser=暂定",
		success : function(data) {
			if (data) {
				alert("该用户不再管理该版块!");
				var addtr = $(object).parents("tr");
				addtr.find("a").text("添加");
				addtr.find("a").attr("onclick", "admin.addUserSection(this)");
				var str = addtr.html();
				var tr = $(object).parents(".modal-content").find(
						"#tbodyUserSection1")
				tr.append(str)

				var currentTr = $(object).parents("tr");
				currentTr.remove();// 删除改行
			} else {
				alert("操作错误!")
			}
		}
	});
}

admin.addUserSection = function(object) {
	var sectionId = $(object).parent().prevAll(".sectionId").text();
	var sectionUser = $(object).parents(".modal-content").find("font").html();
	$.ajax({
		type : "POST",
		url : "/BBS/adminControl/updateSectionUser",
		data : "sectionId=" + sectionId + "&sectionUser=" + sectionUser,
		success : function(data) {
			if (data) {
				alert("添加成功，用户是该版块的版主了");
				// 在管理表添加该版块
				var addtr = $(object).parents("tr");
				addtr.find("a").text("删除");
				addtr.find("a")
						.attr("onclick", "admin.removeUserSection(this)");
				var str = addtr.html();
				var tr = $(object).parents(".modal-content").find(
						"#tbodyUserSection")
				tr.append(str)

				$(object).parents("tr").remove();// 移除该行

			} else {
				alert("操作错误!");
			}
		}
	});
}

admin.initNoteData = function() {
	$
			.ajax({
				type : "POST",
				url : "/BBS/adminControl/findAllNote",
				dataType : "json",
				data : "pageIndex=" + 1,
				success : function(data) {
					var str = "";
					$
							.each(
									data.list.slice(0, 10),
									function(index, item) {
										str += '<tr><td>'
												+ item.noteId
												+ '</td><td>'
												+ item.userName
												+ '</td><td>'
												+ admin.paseDate(item.addtime)
												+ '</td>'
												+ '<td>'
												+ item.noteTitle
												+ '</td><td><font>'
												+ item.sectionName
												+ '</font>( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
												+ '</td><td><a href="#" onclick="admin.removeNoteClick(this)">删除</a>/ <a href="#">恢复</a>/ <a'
												+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
									});
					$("#tbodyNote").html(str);

					var pageCount = data.pageCount;
					var currentPage = data.pageIndex;
					var options = {
						bootstrapMajorVersion : 3,
						currentPage : currentPage,
						totalPages : pageCount,
						numberOfPages : 5,
						itemTexts : function(type, page, current) {
							switch (type) {
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						},
						onPageClicked : function(event, originalEvent, type,
								page) {
							$
									.ajax({
										type : "POST",
										url : "/BBS/adminControl/findAllNote",
										dataType : "json",
										data : "pageIndex=" + page,
										success : function(data) {
											var str = "";
											$
													.each(
															data.list
																	.slice(
																			(page - 1) * 10,
																			(page - 1) * 10 + 10),
															function(index,
																	item) {
																str += '<tr><td>'
																		+ item.noteId
																		+ '</td><td>'
																		+ item.userName
																		+ '</td><td>'
																		+ admin
																				.paseDate(item.addtime)
																		+ '</td>'
																		+ '<td>'
																		+ item.noteTitle
																		+ '</td><td><font>'
																		+ item.sectionName
																		+ '</font>( <a href="#" onclick="admin.updateNoteSection(this)">修改所属版块</a>)'
																		+ '</td><td><a href="#" onclick="admin.removeNoteClick(this)">删除</a>/ <a href="#">恢复</a>/ <a'
																		+ 'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
															});
											$("#tbodyNote").html(str);
										}
									});
						}
					}
					$('#exampleNote').bootstrapPaginator(options);
				}
			});
}

admin.initSectionData = function() {
	$
			.ajax({
				type : "POST",
				url : "/BBS/adminControl/findAllSection",
				dataType : "json",
				data : "pageIndex=" + 1,
				success : function(data) {
					var str = "";
					$
							.each(
									data.list.slice(0, 10),
									function(index, item) {
										str += '<tr><td>'
												+ item.sectionId
												+ '</td><td><font>'
												+ item.sectionName
												+ '</font>(<a href="#" onclick="admin.updateSectionNameClick(this)">修改</a>)</td>'
												+ '<td>'
												+ admin.paseDate(item.addtime)
												+ '</td>'
												+ '<td><a href="#">'
												+ item.sectionUser
												+ '</a>(<a href="#" onclick="admin.updateSectionUserClick(this)">修改</a>)</td>'
												+ '<td><a href="#" onclick="admin.removeSectionClick(this)">删除</a>/ <a href="#">恢复</a></tr>';
									});
					$("#tbodySection").html(str);

					var pageCount = data.pageCount;
					var currentPage = data.pageIndex;
					var options = {
						bootstrapMajorVersion : 3,
						currentPage : currentPage,
						totalPages : pageCount,
						numberOfPages : 5,
						itemTexts : function(type, page, current) {
							switch (type) {
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						},
						onPageClicked : function(event, originalEvent, type,
								page) {
							$
									.ajax({
										type : "POST",
										url : "/BBS/adminControl/findAllSection",
										dataType : "json",
										data : "pageIndex=" + page,
										success : function(data) {
											var str = "";
											$
													.each(
															data.list
																	.slice(
																			(page - 1) * 10,
																			(page - 1) * 10 + 10),
															function(index,
																	item) {
																str += '<tr><td>'
																		+ item.sectionId
																		+ '</td><td><font>'
																		+ item.sectionName
																		+ '</font>(<a href="#" onclick="admin.updateSectionNameClick(this)">修改</a>)</td>'
																		+ '<td>'
																		+ admin
																				.paseDate(item.addtime)
																		+ '</td>'
																		+ '<td><a href="#">'
																		+ item.sectionUser
																		+ '</a>(<a href="#" onclick="admin.updateSectionUserClick(this)">修改</a>)</td>'
																		+ '<td><a href="#" onclick="admin.removeSectionClick(this)">删除</a>/ <a href="#">恢复</a></tr>';
															});
											$("#tbodySection").html(str);
										}
									});
						}
					}
					$('#exampleSection').bootstrapPaginator(options);
				}
			});
}
//修改所属版块，初始化模态框
admin.updateNoteSection = function(object) {
	var sectionName = $(object).prev().text();
	var noteId = $(object).parents("tr").children().first().text();
	$("#noteId").text(noteId);
	$("#sectionName").text(sectionName);
	$
			.ajax({
				type : "POST",
				url : "/BBS/adminControl/findAllSection",
				data : "pageIndex=" + 1,
				success : function(data) {
					$('#myModal2').modal('show');
					var str = "";
					$
							.each(
									data.list.slice(0, 10),
									function(index, item) {
										str += '<tr><td>'
												+ item.sectionId
												+ '</td><td>'
												+ item.sectionName
												+ '</td>'
												+ '<td>'
												+ admin.paseDate(item.addtime)
												+ '</td>'
												+ '<td><a href="#">'
												+ item.sectionUser
												+ '</a></td>'
												+ '<td><a href="#" onclick="admin.xiugaiSection(this)">修改到该版块</a</tr>';
									});
					$("#tbodyNoteSection").html(str);

					var pageCount = data.pageCount;
					var currentPage = data.pageIndex;
					var options = {
						bootstrapMajorVersion : 3,
						currentPage : currentPage,
						totalPages : pageCount,
						numberOfPages : 5,
						itemTexts : function(type, page, current) {
							switch (type) {
							case "first":
								return "首页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "last":
								return "末页";
							case "page":
								return page;
							}
						},
						onPageClicked : function(event, originalEvent, type,
								page) {
							$
									.ajax({
										type : "POST",
										url : "/BBS/adminControl/findAllSection",
										dataType : "json",
										data : "pageIndex=" + page,
										success : function(data) {
											var str = "";
											$
													.each(
															data.list
																	.slice(
																			(page - 1) * 10,
																			(page - 1) * 10 + 10),
															function(index,
																	item) {
																str += '<tr><td>'
																		+ item.sectionId
																		+ '</td><td>'
																		+ item.sectionName
																		+ '</td>'
																		+ '<td>'
																		+ admin
																				.paseDate(item.addtime)
																		+ '</td>'
																		+ '<td><a href="#">'
																		+ item.sectionUser
																		+ '</a></td>'
																		+ '<td><a href="#" onclick="admin.xiugaiSection(this)">修改到该版块</a</tr>';
															});
											$("#tbodyNoteSection").html(str);
										}
									});
						}
					}
					$('#exampleSection3').bootstrapPaginator(options);
				}
			});

}

//修改版块事件，确认后修改数据库
admin.xiugaiSection = function(object) {
	var sectionId = $(object).parents("tr").children().first().text();
	var sectionName = $(object).parents("tr").children().first().next().text();
	$("#sectionName").text(sectionName);
}

admin.updateNoteSectionConfirm = function(object) {
	var noteId = $("#noteId").text();
	var sectionName = $("#sectionName").text();
	$.ajax({//验证note与原来版块是否相同
		type : "GET",
		url : "/BBS/adminControl/getSectionNameByNoteId",
		data : "noteId=" + noteId,
		success : function(data) {
			if (data) {
				if(data == sectionName){
					alert("帖子本属于该版块，无需修改！");
				}else{
					$.ajax({
						type:"GET",
						url:"/BBS/adminControl/updateNoteSection",
						data:"sectionName="+sectionName+"&noteId="+noteId,
						success:function(data){
							if(data){
								alert("修改成功！");
								admin.initNoteData();
							}else{
								alert("操作错误");
							}
						}
					});
				}
			}
		}
	});

}

admin.removeNoteClick=function(object){
	var noteId=$(object).parents("tr").children().first().text();
	$("#user").parent().html('确定要删除 <font color="red" id="user">'+noteId+'</font> 号帖子吗');
	$("#user").parent().next().children().last().attr("onclick","admin.removeNote(this)");
	$('#myModal').modal('show');//公用一个模态框
}

admin.removeNote=function(object){
	var noteId=$("#user").text();
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/removeNote",
		data:"noteId="+noteId,
		success:function(data){
			if (data) {
				alert("帖子已删除,在一定时间内可恢复");
				admin.initNoteData();
			} else {
				alert("删除帖子出错!");
			}
		}
	});
}

//打开修改版块名模态框
admin.updateSectionNameClick=function(object){
	var sectionName=$(object).prev().text();
	$('#myModal3').modal('show');
	$(".sectionName").text(sectionName);
}

//修改版块名
admin.updateSectionName=function(object){
	var sectionName=$(".sectionName").text();
	var sectionNameNew=$(object).parent().prev().children("input").val();
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/findSectionName",
		data:"sectionName="+sectionNameNew,
		success:function(data){
			if(data){
				$.ajax({
					type:"POST",
					url:"/BBS/adminControl/updateSectionName",
					data:"sectionName="+sectionName+"&sectionNameNew="+sectionNameNew,
					success:function(data){
						if(data){
							alert("版块名已修改");
							admin.initSectionData();
						}else{
							alert("操作错误")
						}
					}
				});
			}else{
				alert("版块名已存在")
			}
		}
	});
}

//打开修改版块版主模态框
admin.updateSectionUserClick=function(object){
	var sectionName=$(object).parents("tr").find("font").text();
	var sectionUser=$(object).prev().text();
	$('#myModal4').modal('show');
	$("#bk").text(sectionName);
	$("#gly").text(sectionUser);
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/findAllUser",
		data:"pageIndex="+1,
		success:function(data){
			var str = "";
			$.each(data.list.slice(0, 10),
							function(index, item) {
								str += '<tr><td class="userId">'
										+ item.userId
										+ '</td><td>'
										+ item.username
										+ '</td><td>'						
										+ admin.paseDate(item.addtime)
										+ '</td><td><a href="#" onclick="admin.siugaiSectionUserClick(this)">管理版块</a></td></tr>';
							});
			$("#tbodyUserSectionMt").html(str);

			var pageCount = data.pageCount;
			var currentPage = data.pageIndex;

			var options = {
					bootstrapMajorVersion : 3,
					currentPage : currentPage,
					totalPages : pageCount,
					numberOfPages : 5,
					itemTexts : function(type, page, current) {
						switch (type) {
						case "first":
							return "首页";
						case "prev":
							return "上一页";
						case "next":
							return "下一页";
						case "last":
							return "末页";
						case "page":
							return page;
						}
					},
					onPageClicked : function(event, originalEvent, type,
							page) {
						$.ajax({
									type : "POST",
									url : "/BBS/adminControl/findAllUser",
									dataType : "json",
									data : "pageIndex=" + page,
									success : function(data) {
										var str = "";
										$.each(data.list.slice((page - 1) * 10,(page - 1) * 10 + 10),
														function(index,item) {
															str += '<tr><td class="userId">'
																+ item.userId
																+ '</td><td>'
																+ item.username
																+ '</td><td>'						
																+ admin.paseDate(item.addtime)
																+ '</td><td><a href="#" onclick="admin.siugaiSectionUserClick(this)">管理版块</a></td></tr>';
														});
										$("#tbodyUserSectionMt").html(str);
									}
								});
					}
				}
				$('#exampleSection4').bootstrapPaginator(options);
		}
	});
}

//修改版块管理员，确认后修改数据库
admin.siugaiSectionUserClick=function(object){
	var sectionUser=$(object).parents("tr").children().first().next().text();
	$("#gly").text(sectionUser);
}

//修改版块管理员
admin.updateSectionUser=function(object){
	var sectionName=$("#bk").text();
	var sectionUser=$("#gly").text();
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/updateSectionUserBySectionName",
		data:"sectionName="+sectionName+"&sectionUser="+sectionUser,
		success:function(data){
			if(data){
				alert("版块管理员已修改")
				admin.initSectionData();
			}else{
				alert("操作错误")
			}
		}
	});
}

admin.removeSectionClick=function(object){
	var sectionName=$(object).parents("tr").find("font").text();
	$("#user").parent().html('确定要删除 <font color="red" id="user">'+sectionName+'</font> 版块吗');
	$("#user").parent().next().children().last().attr("onclick","admin.removeSection(this)");
	$("#myModal").modal('show');
}

admin.removeSection=function(object){
	var sectionName=$("#user").text();
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/removeSection",
		data:"sectionName="+sectionName,
		success:function(data){
			if(data){
				alert("版块已删除");
				admin.initSectionData();
			}else{
				alert("操作错误")
			}
		}
	});
}

//解析时间字符串
admin.paseDate = function(date) {
	var time = new Date(date);
	var year = time.getFullYear();
	var month = admin.padleft0(time.getMonth() + 1);
	var day = admin.padleft0(time.getDate());
	var hour = admin.padleft0(time.getHours());
	var minute = admin.padleft0(time.getMinutes());
	var second = admin.padleft0(time.getSeconds());
	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":"
			+ second;
}

//补齐两位数
admin.padleft0 = function(obj) {
	return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}
