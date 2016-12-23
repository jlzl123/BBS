package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Note;
import com.bbs.mapper.NoteMapper;
import com.bbs.service.NoteService;

@Service("noteService")
public class NoteServiceImpl implements NoteService{

	@Resource
	private NoteMapper noteMapper;
	
	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception {
		// TODO Auto-generated method stub
		return noteMapper.findAllNoteBySectionId(sectionId);
	}

	public int insertNote(Note note) throws Exception {
		// TODO Auto-generated method stub
		return noteMapper.insertNote(note);
	}

	public Note findNoteByNoteTitle(String noteTitle) throws Exception {
		// TODO Auto-generated method stub
		return noteMapper.findNoteByNoteTitle(noteTitle);
	}

}
