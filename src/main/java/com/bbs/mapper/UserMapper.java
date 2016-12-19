package com.bbs.mapper;

import com.bbs.bean.User;

public interface UserMapper {

	public User findUserByUsernameAndPass(String username,String password) throws Exception;
}
