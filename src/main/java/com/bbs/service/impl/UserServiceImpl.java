package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.User;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.UserMapper;
import com.bbs.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource
	private UserMapper userMapper;
	
	public User findUserByUsernameAndPass(String username, String password)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.findUserByUsernameAndPass(username, password);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询用户信息异常!");
		}
	}

	public User findUserByUsername(String username) throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.findUserByUsername(username);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询用户信息异常!");
		}
	}

	public int insertUser(User user) throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.insertUser(user);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("添加用户信息异常!");
		}
	}

	public List<User> findAllUser() throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.findAllUser();
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询所有用户信息异常!");
		}
	}

	public int deleteUser(int userId) throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.deleteUser(userId);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("删除用户信息异常!");
		}
	}

	public int updateUserByUserStatus(int userStatus, int userId)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.updateUserByUserStatus(userStatus, userId);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("修改用户信息异常!");
		}
	}

	public int updateUserType(User user) throws Exception {
		// TODO Auto-generated method stub
		try {
			return userMapper.updateUserType(user);
		} catch (Exception e) {
			// TODO: handle exception
		}
		    throw new ServiceException("修改用户信息异常!");
	}

}
