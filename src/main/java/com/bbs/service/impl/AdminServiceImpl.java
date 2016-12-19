package com.bbs.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Admin;
import com.bbs.mapper.AdminMapper;
import com.bbs.service.AdminService;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Resource//@ResourceĬ���ǰ���������װ��ע��ģ�ֻ�е��Ҳ���������ƥ���bean�Żᰴ��������װ��ע��
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
