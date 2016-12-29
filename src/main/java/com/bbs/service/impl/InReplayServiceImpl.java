package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.InReplay;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.InReplayMapper;
import com.bbs.service.InReplayService;

@Service("inReplayService")
public class InReplayServiceImpl implements InReplayService{

	@Resource
	private InReplayMapper inReplayMapper;
	
	public List<InReplay> findAllInReplayByNoteIdAndReplayId(int noteId,
			int replayId) throws Exception {
		// TODO Auto-generated method stub
		try {
			return inReplayMapper.findAllInReplayByNoteIdAndReplayId(noteId, replayId);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询楼层回复信息异常!");
		}
	}

	public int insertInReplay(InReplay inReplay) throws Exception {
		// TODO Auto-generated method stub
		try {
			return inReplayMapper.insertInReplay(inReplay);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("添加楼层回复异常!");
		}
	}

}
