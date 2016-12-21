package com.bbs.until;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Until {
//计算a最前面少一个0
	public static String EncoderByMD5(String str){
		String newString=null;
		try {
			// 生成一个MD5加密计算摘要
			MessageDigest md5=MessageDigest.getInstance("MD5");
			byte[] srcbytes=str.getBytes();
			// 计算md5函数
			md5.update(srcbytes);
	        // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
			byte[] resultBytes=md5.digest();
			// BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
			newString=new BigInteger(1,resultBytes).toString(16);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			System.out.println("MD5加密出现错误");
		}
		return newString;				
	}	
}
