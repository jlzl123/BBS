package com.bbs.web.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bbs.bean.Admin;
import com.bbs.bean.Note;
import com.bbs.bean.Section;
import com.bbs.bean.User;
import com.bbs.service.AdminService;
import com.bbs.service.NoteService;
import com.bbs.service.SectionService;
import com.bbs.service.UserService;
import com.bbs.until.CommonUtil;
import com.bbs.until.MD5Until;

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

	@RequestMapping(value = "/adminLogin", method = RequestMethod.POST)
	public ModelAndView validateAdmin(
			@RequestParam("username") String username,
			@RequestParam("passwordMD5") String password, HttpSession session)
			throws Exception {
		// TODO Auto-generated method stub
		Admin admin = adminService.findAdminByUsername(username);
		ModelAndView model = null;
		if (admin != null
				&& MD5Until.EncoderByMD5(admin.getPassword()).equals(password)) {
			model = new ModelAndView("admin");
			model.addObject("adminUser", username);
		} else {
			model = new ModelAndView("adminLogin");
			model.addObject("adminError", "账号或密码错误!");
		}

		return model;
	}

	@RequestMapping(value = "/findAllUser", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllUser(
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<User> list = userService.findAllUser();
		for (User user : list) {
			if (user.getUserStatus() == 0) {
				user.setUserStatusStr("禁止发言");
			}
			if (user.getUserStatus() == 1) {
				user.setUserStatusStr("正常");
			}
		}
		// 分页
		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/findAllSection", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllSection(
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Section> list = sectionService.findAllSection();
		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/findAllNote", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> findAllNote(
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Note> list = noteService.findAllNote();
		for (Note note : list) {
			Section s = sectionService.findSectionBySectionId(note
					.getSectionId());
			note.setSectionName(s.getSectionName());
		}
		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/removeUser", method = RequestMethod.GET)
	public @ResponseBody Boolean removeUser(@RequestParam("userId") int userId)
			throws Exception {
		boolean flag = false;
		if (userId > 0) {
			int i = userService.deleteUser(userId);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/updateUserStatus", method = RequestMethod.POST)
	public @ResponseBody Boolean updateUserStatus(
			@RequestParam("userStatus") int userStatus,
			@RequestParam("userId") int userId) throws Exception {
		boolean flag = false;
		int i = userService.updateUserByUserStatus(userStatus, userId);
		if (i == 1) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/findSectionBySectionUser", method = RequestMethod.GET)
	public @ResponseBody List<Section> findSectionBySectionUser(
			@RequestParam("sectionUser") String sectionUser) throws Exception {
		List<Section> list = sectionService
				.findSectionBySectionUser(sectionUser);
		return list;
	}

	@RequestMapping(value = "/updateSectionUser", method = RequestMethod.POST)
	public @ResponseBody Boolean updateSectionUser(
			@RequestParam("sectionId") int sectionId,
			@RequestParam("sectionUser") String sectionUser) throws Exception {
		boolean flag = false;
		if (sectionId > 0) {
			Section s = new Section();
			s.setSectionId(sectionId);
			s.setSectionUser(sectionUser);
			if (!sectionUser.equals("暂定")) {// 修改用户类型
				User user = new User();
				user.setUsername(sectionUser);
				user.setUserType("版主");
				userService.updateUserType(user);
			} else {
				Section section = sectionService
						.findSectionBySectionId(sectionId);
				String username = section.getSectionUser();
				List<Section> list = sectionService
						.findSectionBySectionUser(username);
				if (list.size() == 1) {
					User u = new User();
					u.setUsername(username);
					u.setUserType("普通用户");
					userService.updateUserType(u);
				}
			}
			int i = sectionService.updateSectionUser(s);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/findNoUserSection", method = RequestMethod.GET)
	public @ResponseBody List<Section> findNoUserSection(
			HttpServletRequest request) throws Exception {
		List<Section> list = sectionService.findSectionBySectionUser("暂定");
		return list;
	}

	@RequestMapping(value = "/findAllNoteByNoteTitle", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> findAllNoteByNoteTitle(
			@RequestParam("noteTitle") String noteTitle,
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Note> list = noteService.findAllNoteByNoteTitle(noteTitle);
		for (Note note : list) {
			Section s = sectionService.findSectionBySectionId(note
					.getSectionId());
			note.setSectionName(s.getSectionName());
		}

		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/findAllNoteByUser", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> findAllNoteByUser(
			@RequestParam("userName") String userName,
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Note> list = noteService.findAllNoteByUserName(userName);
		for (Note note : list) {
			Section s = sectionService.findSectionBySectionId(note
					.getSectionId());
			note.setSectionName(s.getSectionName());
		}

		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/findAllNoteBySectionName", method = RequestMethod.GET)
	public @ResponseBody Map<String, Object> findAllNoteBySectionName(
			@RequestParam("sectionName") String sectionName,
			@RequestParam("pageIndex") int pageIndex) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		Section section = sectionService.findSectionBySectionName(sectionName);
		List<Note> list = new ArrayList<Note>();
		if (section != null) {
			list = noteService.findAllNoteBySectionId(section.getSectionId());
			for (Note note : list) {
				Section s = sectionService.findSectionBySectionId(note
						.getSectionId());
				note.setSectionName(s.getSectionName());
			}
		}

		int pageSize = 10;
		int rowCount = 0;
		rowCount = list.size();
		if (rowCount % pageSize != 0) {
			rowCount = rowCount / pageSize + 1;
		} else {
			rowCount = rowCount / pageSize;
		}
		map.put("list", list);
		map.put("pageIndex", pageIndex);
		map.put("pageCount", rowCount);
		return map;
	}

	@RequestMapping(value = "/getSectionNameByNoteId", method = RequestMethod.GET)
	public @ResponseBody String getSectionNameByNoteId(
			@RequestParam("noteId") int noteId) throws Exception {
		String str = null;
		if (noteId > 0) {
			Note note = noteService.findNoteByNoteId(noteId);
			Section s = sectionService.findSectionBySectionId(note
					.getSectionId());
			str = s.getSectionName();
		}
		return str;
	}

	@RequestMapping(value = "/updateNoteSection", method = RequestMethod.GET)
	public @ResponseBody Boolean updateNoteSection(
			@RequestParam("sectionName") String sectionName,
			@RequestParam("noteId") int noteId) throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			Note note = new Note();
			note.setNoteId(noteId);
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			note.setSectionId(section.getSectionId());
			int i = noteService.updateNoteSection(note);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/removeNote", method = RequestMethod.GET)
	public @ResponseBody Boolean removeNote(@RequestParam("noteId") int noteId)
			throws Exception {
		boolean flag = false;
		if (noteId > 0) {
			int i = noteService.deleteNote(noteId);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/findSectionName", method = RequestMethod.GET)
	public @ResponseBody Boolean findSectionName(
			@RequestParam("sectionName") String sectionName) throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			if (section == null) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/updateSectionName", method = RequestMethod.POST)
	public @ResponseBody Boolean updateSectionName(
			@RequestParam("sectionName") String sectionName,
			@RequestParam("sectionNameNew") String sectionNameNew)
			throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			section.setSectionName(sectionNameNew);
			int i = sectionService.updateSection(section);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/updateSectionUserBySectionName", method = RequestMethod.POST)
	public @ResponseBody Boolean updateSectionUserBySectionName(
			@RequestParam("sectionName") String sectionName,
			@RequestParam("sectionUser") String sectionUser) throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			section.setSectionUser(sectionUser);// 修改版主
			int i = sectionService.updateSection(section);
			if (i > 0) {
				flag = true;
				User user = new User();
				user.setUsername(sectionUser);
				user.setUserType("版主");
				userService.updateUserType(user);
			}
		}
		return flag;
	}

	@RequestMapping(value = "/removeSection", method = RequestMethod.GET)
	public @ResponseBody Boolean removeSection(
			@RequestParam("sectionName") String sectionName) throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			int i = sectionService.deleteSection(sectionName);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/findSectionBySectionName", method = RequestMethod.GET)
	public @ResponseBody Boolean findSectionBySectionName(
			@RequestParam("sectionName") String sectionName) throws Exception {
		boolean flag = false;
		if (sectionName != null) {
			Section section = sectionService
					.findSectionBySectionName(sectionName);
			if (section != null) {
				flag = true;
			}
		}
		return flag;
	}

	@RequestMapping(value = "/addSectiom", method = RequestMethod.POST)
	public @ResponseBody Boolean addSectiom(HttpServletRequest request)
			throws Exception {
		boolean flag = false;
		String reqString = CommonUtil.getStrFromReq(request);
		JSONObject json = JSONObject.fromObject(reqString);
		Section section = (Section) JSONObject.toBean(json, Section.class);
		if (section != null) {
			int i = sectionService.insertSection(section);
			if (i > 0) {
				flag = true;
			}
		}
		return flag;
	}

	 @RequestMapping(value="/validateAdminPass",method=RequestMethod.POST)
	 public @ResponseBody Boolean validateAdminPass(@RequestParam("password")String 
			 password,@RequestParam("username")String username) throws Exception{
	    boolean flag=false;
	    if(username!=null){
	    	Admin admin=adminService.findAdminByUsername(username);
	    	if(admin!=null&&admin.getPassword().equals(password)){
	    		flag=true;
	    	}
	    }
	    return flag;
	 }
	
	 @RequestMapping(value="/changeAdminPass",method=RequestMethod.POST)
	 public @ResponseBody Boolean changeAdminPass(@RequestParam("password")String
			 password,@RequestParam("username")String username) throws Exception{
	 boolean flag=false;
	 int i=adminService.updateAdmin(username, password);
	 if(i>0){
		 flag=true;
	 }
	 return flag;
	 }
}
