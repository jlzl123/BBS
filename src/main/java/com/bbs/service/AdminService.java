package com.bbs.service;

import com.bbs.bean.Admin;

public interface AdminService {
     
	public Admin findAdminByUsername(Admin admin) throws Exception;
	
	public int insertAdmin(Admin admin) throws Exception;
}
