package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Replay;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.ReplayMapper;
import com.bbs.service.ReplayService;

@Service("replayService")
public class ReplayServiceImpl implements ReplayService{
	
	@Resource
	private ReplayMapper replayMappper;

	public List<Replay> findAllReplayByNoteId(int noteId) throws Exception {
		try {
			return replayMappper.findAllReplayByNoteId(noteId);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询所有回复信息异常!");
		}
	}

	public int insertReplay(Replay replay) throws Exception{	
		try {
			return replayMappper.insertReplay(replay);				
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("添加回复信息异常!");
		}
	}

	public Replay findReplayByUserAndContent(Replay replay) throws Exception {
		// TODO Auto-generated method stub
		try {
			return replayMappper.findReplayByUserAndContent(replay);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询回复信息异常!");
		}
	}

}
