package com.bbs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.bbs.bean.Section;
import com.bbs.exception.ServiceException;
import com.bbs.mapper.SectionMapper;
import com.bbs.service.SectionService;

@Service("sectionService")
public class SectionServiceImpl implements SectionService{

	@Resource
	private SectionMapper sectionMapper;
	
	public List<Section> findAllSection() throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.findAllSection();			
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询所有版块信息异常!");
		}
	}

	public Section findSectionBySectionName(String sectionName)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.findSectionBySectionName(sectionName);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询版块信息异常!");
		}
	}

	public List<Section> findAllSectionBySectionName(String sectionName)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.findAllSectionBySectionName(sectionName);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询所有版块信息异常!");
		}
	}

	public Section findSectionBySectionId(int sectionId) throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.findSectionBySectionId(sectionId);		
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询版块信息异常!");
		}
	}

	public List<Section> findSectionBySectionUser(String sectionUser)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.findSectionBySectionUser(sectionUser);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("查询版块信息异常!");
		}
	}

	public int updateSectionUser(Section section) throws Exception {
		// TODO Auto-generated method stub
		try {
			return sectionMapper.updateSectionUser(section);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ServiceException("修改版块信息异常!");
		}
	}

}
