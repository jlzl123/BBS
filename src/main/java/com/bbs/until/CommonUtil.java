package com.bbs.until;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

public class CommonUtil {

	public static String getStrFromReq(HttpServletRequest request){
		String data=null;
		ServletInputStream sis;
		try {
			sis=request.getInputStream();
			ByteArrayOutputStream baos=new ByteArrayOutputStream();
			byte[] buffer=new byte[1024];
			int len=0;
			while((len=sis.read(buffer))>0){
				baos.write(buffer,0,len);
			}
			data=new String(baos.toByteArray(),"UTF-8");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return data;
	}
}
