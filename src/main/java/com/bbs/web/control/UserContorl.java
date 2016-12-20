package com.bbs.web.control;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bbs.bean.Admin;
import com.bbs.bean.User;
import com.bbs.service.AdminService;
import com.bbs.service.UserService;
import com.bbs.until.MD5Until;

@Controller
@RequestMapping("/userControl")
public class UserContorl {

	@Resource
	private AdminService adminService;
	@Resource
	private UserService userService;
	
	@RequestMapping(value="/adminLogin",method=RequestMethod.POST)
	public String validateAdmin(@RequestParam("username")String username,@RequestParam("password")String password,
			HttpSession session) {
		// TODO Auto-generated method stub
//		ModelAndView model=new ModelAndView("index");
		Admin a=new Admin();
		a.setUsername(username);
		a.setPassword(password);
        Admin admin=null;
		try {
			admin = adminService.findAdminByUsername(a);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if(admin!=null){
        	session.setAttribute("adminName", username);
System.out.println(username);
        }
        return "admin";
	}
	
	@RequestMapping(value="/userLogin",method=RequestMethod.POST)
	public @ResponseBody Boolean validateUserLogin(@RequestParam("username")String username,@RequestParam("password")String password,
			@RequestParam("isChecked")Boolean isChecked,HttpSession session,HttpServletResponse response){
		Boolean flag=false;	
		try {
			User user=userService.findUserByUsernameAndPass(username, password);
			if(user!=null){
				session.setAttribute("username", username);				
				if(isChecked){
					Cookie cookie=new Cookie("Cookie_username", username);
					cookie.setMaxAge(7*24*3600);
					response.addCookie(cookie);
					cookie=new Cookie("Cookie_password", password);
					cookie.setMaxAge(7*24*3600);
					response.addCookie(cookie);
				}
				flag=true;
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return flag;
	}
	
	@RequestMapping(value="/userLogout",method=RequestMethod.GET)
	public @ResponseBody Boolean UserLogout(@RequestParam("username")String username,
			HttpSession session){
		if(session!=null){
			session.removeAttribute("username");
			return true;			
		}
		return false;
	}
}
