package com.bbs.service;

import java.util.List;

import com.bbs.bean.Section;

public interface SectionService {

	public List<Section> findAllSection() throws Exception;
	
	public Section findSectionBySectionName(String sectionName) throws Exception;
	
	public List<Section> findAllSectionBySectionName(String sectionName) throws Exception;
	
	public Section findSectionBySectionId(int sectionId) throws Exception;
	
	public List<Section> findSectionBySectionUser(String sectionUser) throws Exception;

	public int updateSectionUser(Section section) throws Exception;
	
	public int updateSection(Section section) throws Exception;
	
	public int deleteSection(String sectionName) throws Exception;
	
	public int insertSection(Section section) throws Exception;
}
