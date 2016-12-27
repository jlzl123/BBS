package com.bbs.web.control;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.bbs.bean.Admin;
import com.bbs.service.AdminService;

@Controller
@RequestMapping("/adminControl")
public class AdminControl {
	
	@Resource
	private AdminService adminService;

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
}
