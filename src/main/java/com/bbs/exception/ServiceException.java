package com.bbs.exception;

//�Զ�����쳣�����࣬���ڴ����쳣��Ϣ
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
