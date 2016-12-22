package com.bbs.service;

import java.util.List;

import com.bbs.bean.Note;

public interface NoteService {

	public List<Note> findAllNoteBySectionId(int sectionId) throws Exception;
}
