package com.bbs.bean;

import java.util.Date;

public class InReplay {
	private int inReplayId;
	private String inReplayContent;
	private int noteId;
	private int replayId;
	private String inReplayUser;
	private String inReplayToUser;
	private Date addtime;
	public int getInReplayId() {
		return inReplayId;
	}
	public void setInReplayId(int inReplayId) {
		this.inReplayId = inReplayId;
	}
	public String getInReplayContent() {
		return inReplayContent;
	}
	public void setInReplayContent(String inReplayContent) {
		this.inReplayContent = inReplayContent;
	}
	public int getNoteId() {
		return noteId;
	}
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	public int getReplayId() {
		return replayId;
	}
	public void setReplayId(int replayId) {
		this.replayId = replayId;
	}
	public String getInReplayUser() {
		return inReplayUser;
	}
	public void setInReplayUser(String inReplayUser) {
		this.inReplayUser = inReplayUser;
	}
	public String getInReplayToUser() {
		return inReplayToUser;
	}
	public void setInReplayToUser(String inReplayToUser) {
		this.inReplayToUser = inReplayToUser;
	}
	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}
	
}
