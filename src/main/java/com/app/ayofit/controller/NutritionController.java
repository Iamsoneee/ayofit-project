package com.app.ayofit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ayofit.model.NutritionInfo;
import com.app.ayofit.service.NutritionService;

@RestController
@RequestMapping("/api/nutrition")
public class NutritionController {

	@Autowired
	private NutritionService nutritionService;

	@GetMapping("/daily/{userId}/{date}")
	public ResponseEntity<List<NutritionInfo>> getDailyNutrition(@PathVariable String userId,
			@PathVariable String date) {
		List<NutritionInfo> info = nutritionService.getDailyNutrition(userId, date);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

	@GetMapping("/weekly/{userId}")
	public ResponseEntity<List<NutritionInfo>> getWeeklyNutrition(@PathVariable String userId) {
		System.out.println(userId);
		List<NutritionInfo> info = nutritionService.getWeeklyNutrition(userId);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}

	@GetMapping("/monthly/{userId}/{month}")
	public ResponseEntity<List<NutritionInfo>> getMonthlyNutrition(@PathVariable String userId,
			@PathVariable String month) {
		List<NutritionInfo> info = nutritionService.getMonthlyNutrition(userId, month);
		return new ResponseEntity<>(info, HttpStatus.OK);
	}
}
