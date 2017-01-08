package com.bbs.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Admin;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.AdminMapper;
import com.bbs.service.AdminService;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Resource//@Resource默认是按照名称来装配注入的，只有当找不到与名称匹配的bean才会按照类型来装配注入
	private AdminMapper adminMapper;

	public Admin findAdminByUsername(String username) throws Exception {
		try {
			return adminMapper.findAdminByUsername(username);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询管理员信息异常!");
		}

	}

	public int insertAdmin(Admin admin) throws Exception {
		try {
			return adminMapper.insertAdmin(admin);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("添加管理员异常!");
		}
	}

	public int updateAdmin(String username, String password) throws Exception {
		// TODO Auto-generated method stub
		try {
			return adminMapper.updateAdmin(username, password);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("修改管理员信息异常!");
		}
	}

}
