package com.bbs.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.User;
import com.bbs.mapper.UserMapper;
import com.bbs.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource
	private UserMapper userMapper;
	
	public User findUserByUsernameAndPass(String username, String password)
			throws Exception {
		// TODO Auto-generated method stub
		return userMapper.findUserByUsernameAndPass(username, password);
	}

	public User findUserByUsername(String username) throws Exception {
		// TODO Auto-generated method stub
		return userMapper.findUserByUsername(username);
	}

	public int insertUser(User user) throws Exception {
		// TODO Auto-generated method stub
		return userMapper.insertUser(user);
	}

}
