package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Replay;
import com.bbs.mapper.ReplayMapper;
import com.bbs.service.ReplayService;

@Service("replayService")
public class ReplayServiceImpl implements ReplayService{
	
	@Resource
	private ReplayMapper replayMappper;

	public List<Replay> findAllReplayByNoteId(int noteId) throws Exception {
		// TODO Auto-generated method stub
		return replayMappper.findAllReplayByNoteId(noteId);
	}

}
