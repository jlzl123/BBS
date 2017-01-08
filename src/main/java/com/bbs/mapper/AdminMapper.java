package com.bbs.mapper;

import com.bbs.bean.Admin;

public interface AdminMapper {

	public Admin findAdminByUsername(String username) throws Exception;
	
	public int insertAdmin(Admin admin) throws Exception;
	
	public int updateAdmin(String username,String password) throws Exception;
}
