package com.bbs.web.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bbs.bean.User;
import com.bbs.service.UserService;

/**
 * Servlet Filter implementation class LoginFilter
 */
public class LoginFilter extends OncePerRequestFilter {
	
//	private static UserService userService;

	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String Cookie_username=null;
		String Cookie_password=null;
		Cookie cookies[]=request.getCookies();
		if(cookies!=null){	
			for(Cookie cookie:cookies){
				if("Cookie_username".equals(cookie.getName())){
					Cookie_username=cookie.getValue();				
				}
				if("Cookie_password".equals(cookie.getName())){
					Cookie_password=cookie.getValue();
				}
			}
		}	
		if(Cookie_username!=null){
			try {
				//手动获得bean
				ApplicationContext ac=WebApplicationContextUtils.getWebApplicationContext(
						request.getServletContext());
				UserService userService=(UserService) ac.getBean("userService");
				User user=userService.findUserByUsernameAndPass(Cookie_username, Cookie_password);
				if(user!=null){
					request.setAttribute("isExist", true);
					request.setAttribute("username", Cookie_username);
					request.getSession().setAttribute("username", Cookie_username);
				}else{
					request.setAttribute("isExist", false);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		}
		request.getRequestDispatcher("/bbs/index.jsp").forward(request, response);
	}
}
