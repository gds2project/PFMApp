package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.DateDto;
import com.app.dto.IncomeDto;
import com.app.entity.Income;
import com.app.entity.User;
import com.app.service.IncomeService;
import com.app.service.UserService;

import jakarta.servlet.http.HttpSession;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public Income createIncome(@RequestBody Income income, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	income.setUser(u);
        return incomeService.saveIncome(income);
    }

//    @GetMapping
//    public List<Income> getAllIncomes() {
//        return incomeService.getAllIncomes();
//    }

    @GetMapping("/{id}")
    public Income getIncomeById(@PathVariable int id) {
        Income income = incomeService.getIncomeById(id);
        income.setUser(null);
        income.setBorrowing(null);
    	return income;
    }

    @PutMapping("/{id}")
    public Income updateIncome(@PathVariable int id, @RequestBody Income income, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	income.setUser(u);
    	income.setIncomeId(id);
        return incomeService.saveIncome(income);
    }

    @DeleteMapping("/{id}")
    public void deleteIncome(@PathVariable int id) {
        incomeService.deleteIncome(id);
    }
    
    @PostMapping("/day")
    public ResponseEntity<List<IncomeDto>> todaysIncome(@RequestBody DateDto date, HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	LocalDate day = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	return ResponseEntity.ok(incomeService.dayIncome(day, u));
    }
    
    @PostMapping("/week")
    public ResponseEntity<List<IncomeDto>> weeksIncome(HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	return ResponseEntity.ok(incomeService.getWeeklyIncome(u));
    	
    }
    
    @PostMapping("/month")
    public ResponseEntity<List<IncomeDto>> monthIncome(@RequestBody DateDto date, HttpSession session){
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	return ResponseEntity.ok(incomeService.monthIncome(newDate, u));
    }
    
    @PostMapping("/year")
    public ResponseEntity<List<IncomeDto>> yearIncome(@RequestBody DateDto date, HttpSession session){
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	return ResponseEntity.ok(incomeService.yearIncome(newDate, u));
    }
}
