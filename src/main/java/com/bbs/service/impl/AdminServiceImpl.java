package com.bbs.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Admin;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.AdminMapper;
import com.bbs.service.AdminService;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Resource//@ResourceĬ���ǰ���������װ��ע��ģ�ֻ�е��Ҳ���������ƥ���bean�Żᰴ��������װ��ע��
	private AdminMapper adminMapper;

	public Admin findAdminByUsername(Admin admin) throws Exception {
		try {
			return adminMapper.findAdminByUsername(admin);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("��ѯ����Ա��Ϣ�쳣!");
		}

	}

	public int insertAdmin(Admin admin) throws Exception {
		try {
			return adminMapper.insertAdmin(admin);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("��ӹ���Ա�쳣!");
		}
	}

}
