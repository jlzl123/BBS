package com.bbs.mapper;

import java.util.List;

import com.bbs.bean.Section;

public interface SectionMapper {

	public List<Section> findAllSection() throws Exception;
	
	public Section findSectionBySectionName(String sectionName) throws Exception;
}
