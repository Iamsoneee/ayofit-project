package com.app.ayofit.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.ayofit.mapper.AccountMapper;
import com.app.ayofit.model.AccountDTO;
import com.app.ayofit.model.GoalDTO;

@Service
public class AccountDAO {
	
	@Autowired
	private AccountMapper aMapper;
	
	@Autowired
	private ResourceLoader resourceLoader;

	public boolean regAccountInfos(String userId, AccountDTO aDTO) {
		if (aMapper.regAccountInfos(userId, aDTO) == 1) {
			return true;
		}else {
			return false;
		}
	}

	public boolean regAccountGoal(String userId, GoalDTO gDTO) {
		if (aMapper.regAccountGoal(userId, gDTO) == 1) {
			return true;
		}else {
			return false;
		}
	}

	public boolean regAccountWeight(String userId, AccountDTO aDTO) {
		if (aMapper.regAccountWeight(userId, aDTO) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public int regimg(MultipartFile file) {
		try {
		Resource path = resourceLoader.getResource("classpath:filetest/");
		System.out.println(path);
		 File file2 = path.getFile();
		System.out.println(file2);
		
		
		String saveFileName = file.getOriginalFilename();
		System.out.println(saveFileName);
		
		file.transferTo(new File(file2 + "/" +saveFileName));
		System.out.println("성공");
		} catch (Exception e) {
			e.printStackTrace();
			return 1;
		}
		return 0;
	}

	public GoalDTO getAccountGoals(String userId) {
		return aMapper.getAccountGoals(userId);
	}

	public AccountDTO getAccountInfos(String userId) {
		return aMapper.getAccountInfos(userId);
	}

	public double getAccountTarWeight(String userId) {
		return aMapper.getAccountTarWeight(userId);
	}

	public boolean updateAccountInfos(String userId, AccountDTO aDTO) {
		if(aMapper.updateAccountInfos(userId, aDTO) == 1) {
			return true;
		}else {
			return false;
		}
	}

	public boolean updateAccountGoal(String userId, GoalDTO gDTO) {
		if(aMapper.updateAccountGoal(userId, gDTO) == 1) {
			return true;
		}else {
			return false; 
		}
	}
	
	
	
}
