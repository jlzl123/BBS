package com.bbs.service;

import com.bbs.bean.Admin;

public interface AdminService {
     
	public Admin findAdminByUsername(String username) throws Exception;
	
	public int insertAdmin(Admin admin) throws Exception;
	
	public int updateAdmin(String username,String password) throws Exception;
}
