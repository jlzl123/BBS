package com.bbs.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
//全局异常处理器
public class MyExceptionHandler implements HandlerExceptionResolver{

	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		String xr=request.getHeader("X-Requested-With");
		ServiceException serviceException=null;
		if(ex instanceof ServiceException){
			serviceException=(ServiceException) ex;
		}else{
			serviceException=new ServiceException("未知错误");
		}
		String message=serviceException.getMessage();
		//判断是否ajax请求.request.getHeader("x-requested-with"); 为 null，则为传统同步请求，为 XMLHttpRequest，
		//则为Ajax 异步请求。
		if(xr!=null&&"XMLHttpRequest".equalsIgnoreCase(xr)){
			try {//发送错误信息到ajax请求的页面
				response.setCharacterEncoding("utf-8");
				PrintWriter writer=response.getWriter();
				writer.write(message);//在前台ajax能收到信息
				writer.flush();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;			
		}else{//如果是普通请求，跳转错误页面
			ModelAndView model=new ModelAndView();
			model.addObject("message", message);
			model.setViewName("error");
			return model;			
		}
		
	}

	
}
