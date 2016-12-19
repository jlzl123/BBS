package com.bbs.mapper;

import com.bbs.bean.Admin;

public interface AdminMapper {

	public Admin findAdminByUsername(Admin admin) throws Exception;
	
	public int insertAdmin(Admin admin) throws Exception;
}
