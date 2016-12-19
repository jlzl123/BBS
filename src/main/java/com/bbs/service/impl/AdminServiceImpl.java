package com.bbs.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Admin;
import com.bbs.mapper.AdminMapper;
import com.bbs.service.AdminService;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Resource//@Resource默认是按照名称来装配注入的，只有当找不到与名称匹配的bean才会按照类型来装配注入
	private AdminMapper adminMapper;

	public Admin findAdminByUsername(Admin admin) throws Exception {
		// TODO Auto-generated method stub
		return adminMapper.findAdminByUsername(admin);
	}

	public int insertAdmin(Admin admin) throws Exception {
		// TODO Auto-generated method stub
		return adminMapper.insertAdmin(admin);
	}

}
