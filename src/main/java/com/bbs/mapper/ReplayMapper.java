package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.Replay;

public interface ReplayMapper {

	public List<Replay> findAllReplayByNoteId(int noteId) throws Exception;
}