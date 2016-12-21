package com.bbs.bean;

import java.util.Date;

public class Section {
	private int sectionId;
	private String sectionName;
	private String jianjie;
	private String sectionUser;
	private Date addtime;
	public int getSectionId() {
		return sectionId;
	}
	public void setSectionId(int sectionId) {
		this.sectionId = sectionId;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	public String getJianjie() {
		return jianjie;
	}
	public void setJianjie(String jianjie) {
		this.jianjie = jianjie;
	}
	public String getSectionUser() {
		return sectionUser;
	}
	public void setSectionUser(String sectionUser) {
		this.sectionUser = sectionUser;
	}
	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

}
