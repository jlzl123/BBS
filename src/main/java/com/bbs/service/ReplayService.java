package com.bbs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bbs.bean.Replay;

public interface ReplayService {

	public List<Replay> findAllReplayByNoteId(int noteId) throws Exception;
}
