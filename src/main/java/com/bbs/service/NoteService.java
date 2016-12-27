package com.bbs.service;

import java.util.List;

import com.bbs.bean.Note;
import com.bbs.exception.ServiceException;

public interface NoteService {

	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception;
	
	public int insertNote(Note note) throws Exception;
	
	public Note findNoteByNoteTitle(String noteTitle) throws Exception;
	
	public int updateNoteReplay(Note note) throws Exception;
}
