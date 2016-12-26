package com.bbs.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

public class MyExceptionHandler implements HandlerExceptionResolver{

	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		ServiceException serviceException=null;
		if(ex instanceof ServiceException){
			serviceException=(ServiceException) ex;
		}else{
			serviceException=new ServiceException("Î´Öª´íÎó");
		}
		String message=serviceException.getMessage();
		ModelAndView model=new ModelAndView();
		model.addObject("message", message);
		model.setViewName("error");
		return model;
	}

}
