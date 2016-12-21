package com.bbs.mapper;

import com.bbs.bean.User;

public interface UserMapper {

	public User findUserByUsernameAndPass(String username,String password) throws Exception;
	
	public User findUserByUsername(String username) throws Exception;
	
	public int insertUser(User user) throws Exception;
}
