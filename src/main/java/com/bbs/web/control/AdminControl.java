package com.bbs.web.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bbs.bean.Admin;
import com.bbs.bean.Note;
import com.bbs.bean.Section;
import com.bbs.bean.User;
import com.bbs.service.AdminService;
import com.bbs.service.NoteService;
import com.bbs.service.SectionService;
import com.bbs.service.UserService;

@Controller
@RequestMapping("/adminControl")
public class AdminControl {
	
	@Resource
	private AdminService adminService;
	@Resource 
	private UserService userService;
	@Resource
	private NoteService noteService;
	@Resource
	private SectionService sectionService;

	@RequestMapping(value = "/adminLogin", method = RequestMethod.GET)
	public String validateAdmin(@RequestParam("username") String username,
			@RequestParam("password") String password, HttpSession session) throws Exception {
		// TODO Auto-generated method stub
		// ModelAndView model=new ModelAndView("index");
		Admin a = new Admin();
		a.setUsername(username);
		a.setPassword(password);
		Admin admin = adminService.findAdminByUsername(a);
		
		if (admin != null) {
			session.setAttribute("adminName", username);
		}
		return "admin";
	}
	
	@RequestMapping(value="/findAllUser",method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllUser(
			@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		List<User> list=userService.findAllUser();
		for(User user:list){
			if(user.getUserStatus()==0){
				user.setUserStatusStr("禁止发言");
			}
			if(user.getUserStatus()==1){
				user.setUserStatusStr("正常");
			}
		}
		//分页
		int pageSize=10;
		int rowCount=0;
		rowCount=list.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}
	
	@RequestMapping(value="/findAllSection",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllSection(
			@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		List<Section> list=sectionService.findAllSection();
		int pageSize=10;
		int rowCount=0;
		rowCount=list.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}
	
	@RequestMapping(value="/findAllNote",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllNote(
			@RequestParam("pageIndex")int pageIndex) throws Exception{
		Map<String, Object> map=new HashMap<String, Object>();
		List<Note> list=noteService.findAllNote();
		for(Note note:list){
			Section s=sectionService.findSectionBySectionId(note.getSectionId());
			note.setSectionName(s.getSectionName());
		}
		int pageSize=10;
		int rowCount=0;
		rowCount=list.size();
		if(rowCount%pageSize!=0){
			rowCount=rowCount/pageSize+1;
		}else{
			rowCount=rowCount/pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}
	
	@RequestMapping(value="/removeUser",method=RequestMethod.GET)
	public @ResponseBody Boolean removeUser(@RequestParam("userId")int userId) throws Exception{
		boolean flag=false;
		if(userId>0){
			int i=userService.deleteUser(userId);
			if(i>0){
				flag=true;
			}
		}
		return flag;
	}
	
	@RequestMapping(value="/updateUserStatus",method=RequestMethod.POST)
	public @ResponseBody Boolean updateUserStatus(@RequestParam("userStatus")int userStatus,
			@RequestParam("userId")int userId) throws Exception{
		boolean flag=false;
		int i=userService.updateUserByUserStatus(userStatus, userId);
		if(i==1){
			flag=true;
		}
		return flag;
	}
	
	@RequestMapping(value="/findSectionBySectionUser",method=RequestMethod.GET)
	public @ResponseBody List<Section> findSectionBySectionUser(
			@RequestParam("sectionUser")String sectionUser) throws Exception{
		List<Section> list=sectionService.findSectionBySectionUser(sectionUser);
		return list;
	}
}
