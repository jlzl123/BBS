package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Section;
import com.bbs.mapper.SectionMapper;
import com.bbs.service.SectionService;

@Service("sectionService")
public class SectionServiceImpl implements SectionService{

	@Resource
	private SectionMapper sectionMapper;
	
	public List<Section> findAllSection() throws Exception {
		// TODO Auto-generated method stub
		return sectionMapper.findAllSection();
	}

	public Section findSectionBySectionName(String sectionName)
			throws Exception {
		// TODO Auto-generated method stub
		return sectionMapper.findSectionBySectionName(sectionName);
	}

}
