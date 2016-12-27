package com.bbs.service;

import java.util.List;

import com.bbs.bean.InReplay;

public interface InReplayService {

	public List<InReplay> findAllInReplayByNoteIdAndReplayId(int noteId,int replayId) throws Exception;
}
