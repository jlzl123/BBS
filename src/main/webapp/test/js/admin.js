var admin={
		Data:[]
}

$(document).ready(function(){
	admin.clickListener();
	$("#userAdmin").click();
})

admin.clickListener=function(){
	$("#userAdmin").click(function(){
		$("#userAdminDiv").css("display","block");
		$("#noteAdminDiv").css("display","none");
		$("#sectionAdminDiv").css("display","none");
		$("#tag").text("用户列表");
		$("#guanli").text("用户管理");
		admin.initUserData();
	
	});
    $("#noteAdmin").click(function(){
    	$("#noteAdminDiv").css("display","block");
		$("#userAdminDiv").css("display","none");
		$("#sectionAdminDiv").css("display","none");
		$("#tag").text("文章列表");
		$("#guanli").text("文章管理");
		admin.initNoteData();
	});
    $("#sectionAdmin").click(function(){
    	$("#sectionAdminDiv").css("display","block");
		$("#noteAdminDiv").css("display","none");
		$("#userAdminDiv").css("display","none");
		$("#tag").text("版块列表");
		$("#guanli").text("版块管理");
		admin.initSectionData();
	});
}

admin.initUserData=function(){
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/findAllUser",
		dataType:"json",
		data:"pageIndex="+1,
		success:function(data){
			var str="";
			$.each(data.list.slice(0,10),function(index,item){
				str+='<tr><td class="userId">'+item.userId+'</td><td>'+item.username+'</td><td>'+item.userType
				    +'( <a href="#" onclick="admin.updateUserTypeClick(this)">修改</a>)</td>'
					+'<td>'+admin.paseDate(item.addtime)+'</td><td><a href="#" onclick="admin.removeUserClick(this)">删除</a></td>'
					+'<td>'+item.userStatusStr+'(<a href="#" onclick="admin.updateUserClick(this)">禁言</a>)</td></tr>';
			});
			$("#tbodyUser").html(str);
			
			var pageCount=data.pageCount;
			var currentPage=data.pageIndex;
			
			var options={
					bootstrapMajorVersion:3,
					currentPage:currentPage,
			        totalPages:pageCount,
			        numberOfPages:5,
			        itemTexts:function(type,page,current){
			        	switch(type){
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
			        onPageClicked:function(event,originalEvent,type,page){
			        	$.ajax({
			        		type:"POST",
			        		url:"/BBS/adminControl/findAllUser",
			        		dataType:"json",
			        		data:"pageIndex="+page,
			        		success:function(data){
			        			alert(JSON.stringify(data))
			        			var str="";
			        			$.each(data.list.slice((page-1)*10,(page-1)*10+10),function(index,item){
			        				str+='<tr><td class="userId">'+item.userId+'</td><td>'+item.username+'</td><td>'+item.userType
			        				    +'( <a href="#" onclick="admin.updateUserTypeClick(this)">修改</a>)</td>'
			        					+'<td>'+admin.paseDate(item.addtime)+'</td><td><a href="#" onclick="admin.removeUserClick(this)">删除</a></td>'
			        					+'<td>'+item.userStatusStr+'(<a href="#" onclick="admin.updateUserClick(this)>禁言</a>)</td></tr>';
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

admin.removeUserClick=function(object){
	$('#myModal').modal('show');
	var userId=$(object).parents("tr").children(".userId").text();
	$("#a").text(userId);
}

admin.removeUser=function(object){
	var userId=$(object).prev().text();
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/removeUser",
		data:"userId="+userId,
		success:function(data){
			if(data){
				alert("用户已删除");
				admin.initUserData();
			}else{
				alert("删除用户出错!");
			}
		}
	});
}

admin.updateUserClick=function(object){
	var userId=$(object).parent().prevAll(".userId").html();//必需在下面改变之前，否则object不存在了
	$(object).parent().html('禁止发言(<a href="#" onclick="admin.huifuUserClick(this)">恢复</a>)');
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/updateUserStatus",
		data:"userStatus="+0+"&userId="+userId,
		success:function(data){
			if(data){
				alert("该用户已被禁言!");
			}else{
				alert("操作错误!");
			}
		}
	});
}

admin.huifuUserClick=function(object){
	var userId=$(object).parent().prevAll(".userId").html();
	$(object).parent().html('正常(<a href="#" onclick="admin.updateUserClick(this)">禁言</a>)');
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/updateUserStatus",
		data:"userStatus="+1+"&userId="+userId,
		success:function(data){
			if(data){
				alert("该用户已恢复正常!");
			}else{
				alert("操作错误!");
			}
		}
	});
}

admin.updateUserTypeClick=function(object){
	var sectionUser=$(object).parent().prev().text();
	$("#banzhu").text(sectionUser);
	//初始化版主管理版块表	
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/findSectionBySectionUser",
		data:"sectionUser="+sectionUser,
		dataType:"json",
		success:function(data){
			if(data.length>0){//版主
				$('#myModal1').modal('show');
				var str="";
				$.each(data,function(index,item){
					str+='<tr><td class="sectionId">'+item.sectionId+'</td><td>'+item.sectionName+'</td>'
						+'<td>'+admin.paseDate(item.addtime)
						+'</td><td><a href="#" onclick="admin.removeUserSection(this)">删除</a></td></tr>';
				});
				$("#tbodyUserSection").html(str);
			}else{
				$('#myModal1').modal('show');
			}
		}
	});
	//初始化暂定版块表
	$.ajax({
		type:"GET",
		url:"/BBS/adminControl/findNoUserSection",
		success:function(data){
			if(data.length>0){
				var str="";
				$.each(data,function(index,item){
					str+='<tr><td class="sectionId">'+item.sectionId+'</td><td>'+item.sectionName+'</td>'
						+'<td>'+admin.paseDate(item.addtime)
						+'</td><td><a href="#" onclick="admin.addUserSection(this)">添加</a></td></tr>';
				});
				$("#tbodyUserSection1").html(str);
			}
		}
	});

}

admin.removeUserSection=function(object){
	var sectionId=$(object).parent().prevAll(".sectionId").text();
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/updateSectionUser",
		data:"sectionId="+sectionId+"&sectionUser=暂定",
		success:function(data){
			if(data){
				alert("该用户不再管理该版块!");
				var addtr=$(object).parents("tr");
				addtr.find("a").text("添加");
				addtr.find("a").attr("onclick","admin.addUserSection(this)");
				var str=addtr.html();
				var tr=$(object).parents(".modal-content").find("#tbodyUserSection1")
				tr.append(str)
				
				var currentTr=$(object).parents("tr");
				currentTr.remove();//删除改行
			}else{
				alert("操作错误!")
			}
		}
	});
}

admin.addUserSection=function(object){
	var sectionId=$(object).parent().prevAll(".sectionId").text();
	var sectionUser=$(object).parents(".modal-content").find("font").html();
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/updateSectionUser",
		data:"sectionId="+sectionId+"&sectionUser="+sectionUser,
		success:function(data){
			if(data){
				alert("添加成功，用户是该版块的版主了");
				//在管理表添加该版块
				var addtr=$(object).parents("tr");
				addtr.find("a").text("删除");
				addtr.find("a").attr("onclick","admin.removeUserSection(this)");
				var str=addtr.html();
				var tr=$(object).parents(".modal-content").find("#tbodyUserSection")
				tr.append(str)
				
				$(object).parents("tr").remove();//移除该行
				
			}else{
				alert("操作错误!");
			}
		}
	});
}

admin.initNoteData=function(){
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/findAllNote",
		dataType:"json",
		data:"pageIndex="+1,
		success:function(data){
			var str="";
			$.each(data.list.slice(0,10),function(index,item){
				str+='<tr><td>'+item.noteId+'</td><td>'+item.userName+'</td><td>'+admin.paseDate(item.addtime)+'</td>'
					 +'<td>'+item.noteTitle+'</td><td>'+item.sectionName+'( <a href="#">修改所属版块</a>)'
					 +'</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
					 +'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
			});
			$("#tbodyNote").html(str);
			
			var pageCount=data.pageCount;
			var currentPage=data.pageIndex;
			var options={
				    bootstrapMajorVersion:3,
				    currentPage:currentPage,
				    totalPages:pageCount,
			        numberOfPages:5,
			        itemTexts:function(type,page,current){
			        	switch(type){
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
			        onPageClicked:function(event,originalEvent,type,page){
			        	$.ajax({
			        		type:"POST",
			        		url:"/BBS/adminControl/findAllNote",
			        		dataType:"json",
			        		data:"pageIndex="+page,
			        		success:function(data){
			        			var str="";
			        			$.each(data.list.slice((page-1)*10,(page-1)*10+10),function(index,item){
			        				str+='<tr><td>'+item.noteId+'</td><td>'+item.userName+'</td><td>'+admin.paseDate(item.addtime)+'</td>'
			   					 +'<td>'+item.noteTitle+'</td><td>'+item.sectionName+'( <a href="#">修改所属版块</a>)'
								 +'</td><td><a href="#">删除</a>/ <a href="#">恢复</a>/ <a'
								 +'href="javascript:return%20false;" style="opacity: 0.2">置顶</a></td></tr>';
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

admin.initSectionData=function(){
	$.ajax({
		type:"POST",
		url:"/BBS/adminControl/findAllSection",
		dataType:"json",
		data:"pageIndex="+1,
		success:function(data){
			var str="";
			$.each(data.list.slice(0,10),function(index,item){
				str+='<tr><td>'+item.sectionId+'</td><td>'+item.sectionName+'(<a href="#">修改</a>)</td>'
					+'<td>'+admin.paseDate(item.addtime)+'</td>'
					+'<td><a href="#">'+item.sectionUser+'</a>(<a href="#">修改</a>)</td>'
					+'<td><a href="#">删除</a>/ <a href="#">恢复</a></tr>';
			});
			$("#tbodySection").html(str);
			
			var pageCount=data.pageCount;
			var currentPage=data.pageIndex;
			var options={
				    bootstrapMajorVersion:3,
				    currentPage:currentPage,
				    totalPages:pageCount,
			        numberOfPages:5,
			        itemTexts:function(type,page,current){
			        	switch(type){
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
			        onPageClicked:function(event,originalEvent,type,page){
			        	$.ajax({
			        		type:"POST",
			        		url:"/BBS/adminControl/findAllSection",
			        		dataType:"json",
			        		data:"pageIndex="+page,
			        		success:function(data){
			        			var str="";
			        			$.each(data.list.slice((page-1)*10,(page-1)*10+10),function(index,item){
			        				str+='<tr><td>'+item.sectionId+'</td><td>'+item.sectionName+'(<a href="#">修改</a>)</td>'
			    					+'<td>'+admin.paseDate(item.addtime)+'</td>'
			    					+'<td><a href="#">'+item.sectionUser+'</a>(<a href="#">修改</a>)</td>'
			    					+'<td><a href="#">删除</a>/ <a href="#">恢复</a></tr>';
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

//解析时间字符串
admin.paseDate=function(date){
	var time=new Date(date);
	var year=time.getFullYear();
	var month=admin.padleft0(time.getMonth()+1);
	var day=admin.padleft0(time.getDate());
	var hour=admin.padleft0(time.getHours());
	var minute=admin.padleft0(time.getMinutes());
	var second=admin.padleft0(time.getSeconds());
	return year+"-"+month+"-"+day+" "+hour + ":" + minute + ":" + second ;
}

//补齐两位数
admin.padleft0 = function(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}