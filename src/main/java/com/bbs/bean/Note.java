package com.bbs.bean;

import java.util.Date;

public class Note {
	private int noteId;
	private String noteTitle;
	private String status;
	private String content;
    private String userName;
    private int sectionId;
    private Date addtime;
    private String newReplayUser;
    private Date newTime;
	public int getNoteId() {
		return noteId;
	}
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	public String getNoteTitle() {
		return noteTitle;
	}
	public void setNoteTitle(String noteTitle) {
		this.noteTitle = noteTitle;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getSectionId() {
		return sectionId;
	}
	public void setSectionId(int sectionId) {
		this.sectionId = sectionId;
	}
	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}
	public String getNewReplayUser() {
		return newReplayUser;
	}
	public void setNewReplayUser(String newReplayUser) {
		this.newReplayUser = newReplayUser;
	}
	public Date getNewTime() {
		return newTime;
	}
	public void setNewTime(Date newTime) {
		this.newTime = newTime;
	}
    
    
}
