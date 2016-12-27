package com.bbs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bbs.bean.Replay;
import com.bbs.exception.ServiceException;

public interface ReplayService {

	public List<Replay> findAllReplayByNoteId(int noteId) throws Exception;
	
	public int insertReplay(Replay replay) throws Exception;
	
	public Replay findReplayByUserAndContent(Replay replay) throws Exception;
}
