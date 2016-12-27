package com.bbs.exception;

//自定义的异常处理类，用于处理异常信息
public class ServiceException extends Exception{

	private String message;

	public ServiceException() {
		// TODO Auto-generated constructor stub
		super();
	}
	
	public ServiceException(String message) {
		// TODO Auto-generated constructor stub
		super(message);
		this.message=message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}
}
