package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.InReplay;

public interface InReplayMapper {

	public List<InReplay> findAllInReplayByNoteIdAndReplayId(int noteId,int replayId) throws Exception;
}
