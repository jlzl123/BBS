package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Note;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.NoteMapper;
import com.bbs.service.NoteService;

@Service("noteService")
public class NoteServiceImpl implements NoteService{

	@Resource
	private NoteMapper noteMapper;
	
	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception {
		// TODO Auto-generated method stub
		try {
			return noteMapper.findAllNoteBySectionId(sectionId);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询所有帖子信息异常!");
		}
	}

	public int insertNote(Note note) throws Exception {
		// TODO Auto-generated method stub
		try {
			return noteMapper.insertNote(note);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("添加帖子信息异常!");
		}
	}

	public Note findNoteByNoteTitle(String noteTitle) throws Exception {
		// TODO Auto-generated method stub
		try {
			return noteMapper.findNoteByNoteTitle(noteTitle);			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询帖子信息异常!");
		}
	}

	public int updateNoteReplay(Note note) throws Exception {
		// TODO Auto-generated method stub
		try {
			return noteMapper.updateNoteReplay(note);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("更新帖子信息异常!");
		}

	}

}
