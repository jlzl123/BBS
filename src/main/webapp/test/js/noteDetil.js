var noteDetil={
		Data:[]
}

$(document).ready(function(){
	noteDetil.initNoteDetil();
})

noteDetil.initNoteDetil=function(){
	var noteTitle=$("#noteTitle").text();
	$.ajax({
		type:"GET",
		url:"/BBS/userControl/findNoteDetilByNoteTitle",
		dataType:"json",
		data:"noteTitle="+noteTitle,
		success:function(data){
	
			$("#noteUser").text(data.note.userName);
			$("#noteAddTime").text(noteDetil.paseDate(data.note.addtime));
			$("#sectionName").text(data.sectionName);
			$("#replayTatol").text(data.note.replayToatl);
			$("#noteContent").text(data.note.content);
		}
	});
}

//解析时间字符串
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

//补齐两位数
noteDetil.padleft0 = function(obj) {
	return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}