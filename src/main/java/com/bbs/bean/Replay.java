package com.bbs.bean;

import java.util.Date;

public class Replay {

	private int replayId;
	private String replayContent;
	private String userName;
	private Date replayTime;
	private int noteId;
	
	private int inReplayTotal;//非表字段
	
	public int getReplayId() {
		return replayId;
	}
	public void setReplayId(int replayId) {
		this.replayId = replayId;
	}
	public String getReplayContent() {
		return replayContent;
	}
	public void setReplayContent(String replayContent) {
		this.replayContent = replayContent;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getReplayTime() {
		return replayTime;
	}
	public void setReplayTime(Date replayTime) {
		this.replayTime = replayTime;
	}
	public int getNoteId() {
		return noteId;
	}
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	
	public int getInReplayTotal() {
		return inReplayTotal;
	}
	public void setInReplayTotal(int inReplayTotal) {
		this.inReplayTotal = inReplayTotal;
	}
}
