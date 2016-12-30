package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.Section;

public interface SectionMapper {

	public List<Section> findAllSection() throws Exception;
	
	public Section findSectionBySectionName(String sectionName) throws Exception;
	
	public List<Section> findAllSectionBySectionName(String sectionName) throws Exception;
	
	public Section findSectionBySectionId(int sectionId) throws Exception;
}
