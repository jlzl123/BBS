package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.Note;

public interface NoteMapper {

	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception;
	
	public int insertNote(Note note) throws Exception;
	
	public Note findNoteByNoteTitle(String noteTitle) throws Exception;
	
	public int updateNoteReplay(Note note) throws Exception;
	
	public List<Note> findAllNoteByNoteTitle(String noteTitle) throws Exception;
	
	public List<Note> findAllNoteByUserName(String userName) throws Exception;
	
	public List<Note> findAllNote() throws Exception;
}
