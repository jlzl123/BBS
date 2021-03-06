package com.bbs.web.control;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.catalina.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bbs.bean.Admin;
import com.bbs.bean.InReplay;
import com.bbs.bean.Note;
import com.bbs.bean.Replay;
import com.bbs.bean.Section;
import com.bbs.bean.User;
import com.bbs.service.AdminService;
import com.bbs.service.InReplayService;
import com.bbs.service.NoteService;
import com.bbs.service.ReplayService;
import com.bbs.service.SectionService;
import com.bbs.service.UserService;
import com.bbs.until.CommonUtil;
import com.bbs.until.MD5Until;

@Controller
@RequestMapping("/userControl")
public class UserContorl {

	@Resource
	private AdminService adminService;
	@Resource
	private UserService userService;
	@Resource
	private SectionService sectionService;
	@Resource
	private NoteService noteService;
	@Autowired
	// @Resource
	private ReplayService replayService;
	@Resource
	private InReplayService inReplayService;

	/*
	 * @Autowired根据类型装配
	 * 
	 * @Resource根据名称装配
	 */

	@RequestMapping(value="/validateIsLogined",method=RequestMethod.POST)
	public @ResponseBody String validateIsLogined(HttpSession session){
		String username=(String) session.getAttribute("username");
		if(username!=null){
			return username;
		}
		return "T";
	}
	
	@RequestMapping(value = "/userLogin", method = RequestMethod.POST)
	public @ResponseBody Boolean validateUserLogin(
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("isChecked") Boolean isChecked, HttpSession session,
			HttpServletResponse response) throws Exception {
		Boolean flag = false;
		User user = userService.findUserByUsernameAndPass(username, password);
		if (user != null) {
			session.setAttribute("username", username);
			if (isChecked) {
				Cookie cookie = new Cookie("Cookie_username", username);
				cookie.setMaxAge(7 * 24 * 3600);
				// 设置cookie的路径，当请求为该路径下是提交cookie
				cookie.setPath("/BBS");
				response.addCookie(cookie);
				cookie = new Cookie("Cookie_password", password);
				cookie.setMaxAge(7 * 24 * 3600);
				cookie.setPath("/BBS");
				response.addCookie(cookie);
			}
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/userLogout", method = RequestMethod.GET)
	public @ResponseBody Boolean UserLogout(
			@RequestParam("username") String username, HttpSession session) {
		if (session != null) {
			session.removeAttribute("username");
			return true;
		}
		return false;
	}

	@RequestMapping(value = "/validateUsername", method = RequestMethod.GET)
	public @ResponseBody Boolean validateUsername(
			@RequestParam("username") String username) throws Exception {
		Boolean flag = false;
		if (username != null) {
			User user = userService.findUserByUsername(username);
			if (user != null) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody Boolean addUser(@RequestParam("json") String json)
			throws Exception {
		Boolean flag = false;
		JSONObject jsonObject = JSONObject.fromObject(json);
		User user = (User) JSONObject.toBean(jsonObject, User.class);
		// SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date = new Date();
		user.setAddtime(date);
		user.setUserStatus(1);
		user.setUserType("普通用户");
		int i = userService.insertUser(user);
		if (i > 0) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/findAllSection", method = RequestMethod.GET)
	public @ResponseBody List<Section> findAllSection(HttpServletRequest request)
			throws Exception {
		List<Section> sectionList = null;
		sectionList = sectionService.findAllSection();
		return sectionList;
	}
	
	@RequestMapping(value="/findSection",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> findSection(@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		int pageSize=9;
		int rowCount=0;
		List<Section> list=sectionService.findAllSection();
		rowCount=list.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", list);
		map.put("pageCount", rowCount);
		map.put("pageIndex", pageIndex);
		return map;
	}

	@RequestMapping(value="/findAllSectionBySectionName",method=RequestMethod.GET)
	public @ResponseBody List<Section> findAllSectionBySectionName(
			@RequestParam("sectionName")String sectionName) throws Exception{
		List<Section> sectionList = sectionService.findAllSectionBySectionName(sectionName);
		return sectionList;
	}
	
	@RequestMapping(value = "/findAllNoteBySectionId", method = RequestMethod.GET)
	public @ResponseBody List<Note> findAllNoteBySectionId(
			@RequestParam("sectionName") String sectionName) throws Exception {
		List<Note> noteList = null;
		List<Note> ln = new ArrayList<Note>();
		if (sectionName != null) {
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			if (section != null) {
				int sectionId = section.getSectionId();
				noteList = noteService.findAllNoteBySectionId(sectionId);
				if (noteList != null) {//添加回复数
					for (Note note : noteList) {
						int noteId = note.getNoteId();
						List<Replay> list = replayService
								.findAllReplayByNoteId(noteId);
						int replayToatl = list.size();
						note.setReplayToatl(replayToatl);
						ln.add(note);
					}
				}
			}
		}
		int pageSize=10;
		return ln;
	}

	@RequestMapping(value="/findallNoteBySectionId",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> findallNoteBySectionId(@RequestParam("sectionName"
			)String sectionName,@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		List<Note> ln = new ArrayList<Note>();
		if (sectionName != null) {
			Section section = sectionService.findSectionBySectionName(sectionName);
			if (section != null) {
				int sectionId = section.getSectionId();
				List<Note> noteList = noteService.findAllNoteBySectionId(sectionId);
				if (noteList != null) {//添加回复数
					for (Note note : noteList) {
						int noteId = note.getNoteId();
						List<Replay> list = replayService
								.findAllReplayByNoteId(noteId);
						int replayToatl = list.size();
						note.setReplayToatl(replayToatl);
						ln.add(note);
					}
				}
			}
		}
		//加上分页数和当前页码
		int pageSize=10;
		int rowCount=0;
		rowCount=ln.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", ln);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}
	
	@RequestMapping(value="/findAllNoteByNoteTitle",method=RequestMethod.GET)
	public @ResponseBody List<Note> findAllNoteByNoteTitle(@RequestParam("noteTitle")String noteTitle) throws Exception{
		List<Note> noteList=noteService.findAllNoteByNoteTitle(noteTitle);
		return noteList;
	}
	
	@RequestMapping(value = "/addNote", method = RequestMethod.POST)
	public @ResponseBody String addNote(HttpServletRequest request)
			throws Exception {
		String returnStr = null;
		String reqString = CommonUtil.getStrFromReq(request);
		JSONObject json = JSONObject.fromObject(reqString);
		String sectionName = (String) json.get("sectionName");
		Note note = (Note) JSONObject.toBean(JSONObject.fromObject(reqString),
				Note.class);
		if (sectionName != null) {
			Section section = sectionService.findSectionBySectionName(sectionName);
			note.setSectionId(section.getSectionId());
		} else {
			return returnStr;
		}
		Note n = noteService.findNoteByNoteTitle(note.getNoteTitle());
		if (n == null) {
			int i = noteService.insertNote(note);
			if (i >0) {
				returnStr = "success";
				return returnStr;
			}
		} else {
			returnStr = "Exist";
			return returnStr;// ����Exist����ʾnote�Ѵ���
		}
		return reqString;
	}

	@RequestMapping(value = "/findReplay", method = RequestMethod.GET)
	public @ResponseBody List<Replay> findReplay(
			@RequestParam("noteTitle") String noteTitle) throws Exception {
		List<Replay> replayList =new ArrayList<Replay>();
		if (noteTitle != null) {
			Note note = noteService.findNoteByNoteTitle(noteTitle);
			//在一楼添加加帖子内容
			Replay replay=new Replay();
			replay.setNoteId(note.getNoteId());
			replay.setReplayContent(note.getContent());
			replay.setUserName(note.getUserName());
			replay.setReplayTime(note.getAddtime());
			replayList.add(replay);
			if (note != null) {
				List<Replay> list= replayService.findAllReplayByNoteId(note
						.getNoteId());
				for(Replay r:list){
					List<InReplay> lir=inReplayService.findAllInReplayByNoteIdAndReplayId(
							r.getNoteId(),r.getReplayId());
					int inReplayTotal=lir.size();
					r.setInReplayTotal(inReplayTotal);
					replayList.add(r);
				}
			}

		}
		return replayList;
	}
	
	@RequestMapping(value="/findAllReplay",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllReplay(@RequestParam("noteTitle")String noteTitle,
			@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		List<Replay> replayList =new ArrayList<Replay>();
		if (noteTitle != null) {
			Note note = noteService.findNoteByNoteTitle(noteTitle);
			//在一楼添加加帖子内容
			Replay replay=new Replay();
			replay.setNoteId(note.getNoteId());
			replay.setReplayContent(note.getContent());
			replay.setUserName(note.getUserName());
			replay.setReplayTime(note.getAddtime());
			replayList.add(replay);
			if (note != null) {
				List<Replay> list= replayService.findAllReplayByNoteId(note
						.getNoteId());
				for(Replay r:list){
					List<InReplay> lir=inReplayService.findAllInReplayByNoteIdAndReplayId(
							r.getNoteId(),r.getReplayId());
					int inReplayTotal=lir.size();
					r.setInReplayTotal(inReplayTotal);
					replayList.add(r);
				}
			}

		}
		int rowCount=0;
		int pageSize=10;
		rowCount=replayList.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", replayList);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/addReplay", method = RequestMethod.POST)
	public @ResponseBody String addReplay(HttpServletRequest request,
			HttpSession session) throws Exception {
		String returnStr = null;
		String reqString = CommonUtil.getStrFromReq(request);
		JSONObject json = JSONObject.fromObject(reqString);
		String noteTitle = json.getString("noteTitle");
//		String newTime = json.getString("replayTime");
		String userName = (String) session.getAttribute("username");
		if (userName == null) {
			return returnStr = "noLogin";
		}
		Note note = noteService.findNoteByNoteTitle(noteTitle);

		Replay replay = (Replay) JSONObject.toBean(json, Replay.class);
		replay.setNoteId(note.getNoteId());
		replay.setUserName(userName);

		int i = replayService.insertReplay(replay);
		note.setNewReplayUser(replay.getUserName());
		note.setNewTime(replay.getReplayTime());
		noteService.updateNoteReplay(note);
		if (i > 0) {
			returnStr = "success";
		}

		return returnStr;
	}
	
	@RequestMapping(value="/findAllInReplay",method=RequestMethod.POST)
	public @ResponseBody List<InReplay> findAllInReplayByNoteIdAndReplayId(HttpServletRequest request) throws Exception{
		List<InReplay> inReplayList=new ArrayList<InReplay>();
		String reqString=CommonUtil.getStrFromReq(request);
		JSONObject json=JSONObject.fromObject(reqString);
		String userName=json.getString("replayUser");
		String replayContent=json.getString("replayContent");
		String noteTitle=json.getString("noteTitle");	
		Replay replay=new Replay();
		replay.setUserName(userName);
		replay.setReplayContent(replayContent);
		Replay r=replayService.findReplayByUserAndContent(replay);
		int replayId=r.getReplayId();
		Note note=noteService.findNoteByNoteTitle(noteTitle);
		int noteId=note.getNoteId();
		inReplayList=inReplayService.findAllInReplayByNoteIdAndReplayId(noteId, replayId);
		return inReplayList;
	}
	
	@RequestMapping(value="/addInReplay",method=RequestMethod.POST)
	public @ResponseBody String addInReplay(HttpServletRequest request) throws Exception{
		String returnStr=null;
		String reqString=CommonUtil.getStrFromReq(request);
		JSONObject json=JSONObject.fromObject(reqString);
		String replayUser=json.getString("replayUser");
		String replayContent=json.getString("replayContent");
		String noteTitle=json.getString("noteTitle");
		InReplay inReplay=(InReplay) JSONObject.toBean(json, InReplay.class);
		int noteId=noteService.findNoteByNoteTitle(noteTitle).getNoteId();
		Replay replay=new Replay();
		replay.setReplayContent(replayContent);
		replay.setUserName(replayUser);
		int replayId=replayService.findReplayByUserAndContent(replay).getReplayId();
		inReplay.setNoteId(noteId);
		inReplay.setReplayId(replayId);
		int i=inReplayService.insertInReplay(inReplay);
		if(i>0){
			reqString="success";
		}else{
			reqString="error";
		}
		return reqString;
	}
	
	@RequestMapping(value="/findSectionNameBynoteTitle",method=RequestMethod.GET)
	public @ResponseBody String findSectionNameBynoteTitle(
			@RequestParam("noteTitle")String noteTitle) throws Exception{
		String returnStr=null;
		Note note=noteService.findNoteByNoteTitle(noteTitle);
		Section section=sectionService.findSectionBySectionId(note.getSectionId());
		returnStr=section.getSectionName();
		return returnStr;
	}
	
	@RequestMapping(value="/findAllNoteByUserName",method=RequestMethod.GET)
	public @ResponseBody List<Note> findAllNoteByUserName(
			@RequestParam("userName")String userName) throws Exception{
		return noteService.findAllNoteByUserName(userName);
	}
	
	@RequestMapping(value="/findNoteDetilByNoteTitle",method=RequestMethod.GET)
	public @ResponseBody Map<String, Object> findNoteDetilByNoteTitle(@RequestParam("noteTitle") String noteTitle) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		Note note=noteService.findNoteByNoteTitle(noteTitle);
		List<Replay> list=replayService.findAllReplayByNoteId(note.getNoteId());
		int replayToatl=list.size();
		Section section=sectionService.findSectionBySectionId(note.getSectionId());
		String sectionName=section.getSectionName();
		note.setReplayToatl(replayToatl);
        map.put("note", note);
        map.put("sectionName", sectionName);
		return map;
	}
}
