package com.app.controllers;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DateDto;
import com.app.dto.ExpenditureDto;
import com.app.entity.Expenditure;
import com.app.entity.User;
import com.app.service.ExpenditureService;
import com.app.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/expenditures")
public class ExpenditureController {

    @Autowired
    private ExpenditureService expenditureService;
    
    @Autowired
    private UserService userService;

    @SuppressWarnings("rawtypes")
	@PostMapping
    public ResponseEntity createExpenditure(@RequestBody Expenditure expenditure, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	expenditure.setUser(u);
    	Expenditure newEx = null;
    	newEx = expenditureService.saveExpenditure(expenditure);
    	if(newEx != null)
    		return ResponseEntity.ok(null);
    	else return ResponseEntity.noContent().build();
    }

//    @GetMapping
//    public List<Expenditure> getAllExpenditures() {
//        return expenditureService.getAllExpenditures();
//    }

    @GetMapping("/{id}")
    public Expenditure getExpenditureById(@PathVariable int id) {
    	Expenditure e = expenditureService.getExpenditureById(id);
    	e.setLending(null);
    	e.setUser(null);
        return e;
    }

    @PutMapping("/{id}")
    public Expenditure updateExpenditure(@PathVariable int id, @RequestBody Expenditure expenditure, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	expenditure.setUser(u);
        expenditure.setExpenditureId(id);
        return expenditureService.saveExpenditure(expenditure);
    }

    @DeleteMapping("/{id}")
    public void deleteExpenditure(@PathVariable int id) {
        expenditureService.deleteExpenditure(id);
    }
    
    @PostMapping("/day")
    public ResponseEntity<List<ExpenditureDto>> todaysExpenditures(@RequestBody DateDto date, HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	return ResponseEntity.ok(expenditureService.todaysExpenditures(newDate, u));
    	
    }
    
    @PostMapping("/month")
    public ResponseEntity<List<ExpenditureDto>> monthExpenditures(@RequestBody DateDto date, HttpSession session){
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	return ResponseEntity.ok(expenditureService.monthExpenditures(newDate, u));
    	
    }
    
    @PostMapping("/year")
    public ResponseEntity<List<ExpenditureDto>> yearExpenditures(@RequestBody DateDto date, HttpSession session){
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	return ResponseEntity.ok(expenditureService.yearExpenditures(newDate, u));
    	
    }
}
