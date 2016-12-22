package com.bbs.service;

import java.util.List;

import com.bbs.bean.Section;

public interface SectionService {

	public List<Section> findAllSection() throws Exception;
	
	public Section findSectionBySectionName(String sectionName) throws Exception;
}
