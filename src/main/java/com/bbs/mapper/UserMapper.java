package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.User;

public interface UserMapper {

	public User findUserByUsernameAndPass(String username,String password) throws Exception;
	
	public User findUserByUsername(String username) throws Exception;
	
	public int insertUser(User user) throws Exception;
	
	public List<User> findAllUser() throws Exception;
	
	public int deleteUser(int userId) throws Exception;
	
	public int updateUserByUserStatus(int userStatus,int userId) throws Exception;
}
