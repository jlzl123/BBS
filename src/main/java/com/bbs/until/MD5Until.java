package com.bbs.until;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Until {
//����a��ǰ����һ��0
	public static String EncoderByMD5(String str){
		String newString=null;
		try {
			// ����һ��MD5���ܼ���ժҪ
			MessageDigest md5=MessageDigest.getInstance("MD5");
			byte[] srcbytes=str.getBytes();
			// ����md5����
			md5.update(srcbytes);
	        // digest()���ȷ������md5 hashֵ������ֵΪ8Ϊ�ַ�������Ϊmd5 hashֵ��16λ��hexֵ��ʵ���Ͼ���8λ���ַ�
			byte[] resultBytes=md5.digest();
			// BigInteger������8λ���ַ���ת����16λhexֵ�����ַ�������ʾ���õ��ַ�����ʽ��hashֵ
			newString=new BigInteger(1,resultBytes).toString(16);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			System.out.println("MD5���ܳ��ִ���");
		}
		return newString;				
	}	
}
