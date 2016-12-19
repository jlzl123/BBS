package com.bbs.service;

import com.bbs.bean.User;

public interface UserService {

	public User findUserByUsernameAndPass(String username,String password) throws Exception;
}
