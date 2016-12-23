package com.bbs.web.control;

import java.text.SimpleDateFormat;
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

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bbs.bean.Admin;
import com.bbs.bean.Note;
import com.bbs.bean.Replay;
import com.bbs.bean.Section;
import com.bbs.bean.User;
import com.bbs.service.AdminService;
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
	@Resource
	private ReplayService replayService;

	@RequestMapping(value = "/adminLogin", method = RequestMethod.POST)
	public String validateAdmin(@RequestParam("username") String username,
			@RequestParam("password") String password, HttpSession session) {
		// TODO Auto-generated method stub
		// ModelAndView model=new ModelAndView("index");
		Admin a = new Admin();
		a.setUsername(username);
		a.setPassword(password);
		Admin admin = null;
		try {
			admin = adminService.findAdminByUsername(a);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (admin != null) {
			session.setAttribute("adminName", username);
		}
		return "admin";
	}

	@RequestMapping(value = "/userLogin", method = RequestMethod.POST)
	public @ResponseBody Boolean validateUserLogin(
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("isChecked") Boolean isChecked, HttpSession session,
			HttpServletResponse response) {
		Boolean flag = false;
		try {
			User user = userService.findUserByUsernameAndPass(username,
					password);
			if (user != null) {
				session.setAttribute("username", username);
				if (isChecked) {
					Cookie cookie = new Cookie("Cookie_username", username);
					cookie.setMaxAge(7 * 24 * 3600);
					// 设置cookie的路径，当请求为改路径极其子路径时会提交cookie
					cookie.setPath("/BBS");
					response.addCookie(cookie);
					cookie = new Cookie("Cookie_password", password);
					cookie.setMaxAge(7 * 24 * 3600);
					cookie.setPath("/BBS");
					response.addCookie(cookie);
				}
				flag = true;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
			@RequestParam("username") String username) {
		Boolean flag = false;
		if (username != null) {
			try {
				User user = userService.findUserByUsername(username);
				if (user != null) {
					flag = true;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return flag;
	}

	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody Boolean addUser(@RequestParam("json") String json) {
		Boolean flag = false;
		JSONObject jsonObject = JSONObject.fromObject(json);
		User user = (User) JSONObject.toBean(jsonObject, User.class);
		// SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date = new Date();
		user.setAddtime(date);
		user.setUserStatus(1);
		try {
			userService.insertUser(user);
			flag = true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag;
	}

	@RequestMapping(value = "/findAllSection", method = RequestMethod.GET)
	public @ResponseBody List<Section> findAllSection(HttpServletRequest request) {
		List<Section> sectionList = null;
		try {
			sectionList = sectionService.findAllSection();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sectionList;
	}

	@RequestMapping(value = "/findAllNoteBySectionId", method = RequestMethod.GET)
	public @ResponseBody List<Note> findAllNoteBySectionId(
			@RequestParam("sectionName") String sectionName) {
		List<Note> noteList = null;
		if (sectionName != null) {
			try {
				Section section = sectionService
						.findSectionBySectionName(sectionName);
				if (section != null) {
					int sectionId = section.getSectionId();
					noteList = noteService.findAllNoteBySectionId(sectionId);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return noteList;
	}

	@RequestMapping(value = "/addNote", method = RequestMethod.POST)
	public @ResponseBody String addNote(HttpServletRequest request) {
		String returnStr = null;
		String reqString = CommonUtil.getStrFromReq(request);
		JSONObject json = JSONObject.fromObject(reqString);
		String sectionName = (String) json.get("sectionName");
		Note note = (Note) JSONObject.toBean(JSONObject.fromObject(reqString),
				Note.class);
		if (sectionName != null) {
			try {
				Section section = sectionService
						.findSectionBySectionName(sectionName);
				note.setSectionId(section.getSectionId());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			return returnStr;
		}
		try {
			Note n = noteService.findNoteByNoteTitle(note.getNoteTitle());
			if (n == null) {
				int i = noteService.insertNote(note);
				if (i == 1) {
					returnStr = "success";
					return returnStr;
				}
			} else {
				returnStr = "Exist";
				return returnStr;// 返回Exist，表示note已存在
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return reqString;
	}

	@RequestMapping(value = "/findReplay", method = RequestMethod.GET)
	public @ResponseBody List<Replay> findReplay(
			@RequestParam("noteTitle") String noteTitle) {
		List<Replay> replayList = null;
		if (noteTitle != null) {
			try {
				Note note = noteService.findNoteByNoteTitle(noteTitle);
				replayList = replayService.findAllReplayByNoteId(note.getNoteId());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return replayList;
	}
}
