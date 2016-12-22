package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.Note;

public interface NoteMapper {

	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception;
}
