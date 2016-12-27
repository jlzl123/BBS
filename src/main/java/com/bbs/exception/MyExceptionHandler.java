package com.bbs.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
//ȫ���쳣������
public class MyExceptionHandler implements HandlerExceptionResolver{

	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		// TODO Auto-generated method stub
		String xr=request.getHeader("X-Requested-With");
		ServiceException serviceException=null;
		if(ex instanceof ServiceException){
			serviceException=(ServiceException) ex;
		}else{
			serviceException=new ServiceException("δ֪����");
		}
		String message=serviceException.getMessage();
		//�ж��Ƿ�ajax����.request.getHeader("x-requested-with"); Ϊ null����Ϊ��ͳͬ������Ϊ XMLHttpRequest��
		//��ΪAjax �첽����
		if(xr!=null&&"XMLHttpRequest".equalsIgnoreCase(xr)){
			try {//���ʹ�����Ϣ��ajax�����ҳ��
				response.setCharacterEncoding("utf-8");
				PrintWriter writer=response.getWriter();
				writer.write(message);//��ǰ̨ajax���յ���Ϣ
				writer.flush();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;			
		}else{//�������ͨ������ת����ҳ��
			ModelAndView model=new ModelAndView();
			model.addObject("message", message);
			model.setViewName("error");
			return model;			
		}
		
	}

	
}
