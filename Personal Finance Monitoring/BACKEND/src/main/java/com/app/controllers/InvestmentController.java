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
import com.app.dto.InvestmentDto;
import com.app.entity.Investment;
import com.app.entity.User;
import com.app.service.InvestmentService;
import com.app.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/investments")
public class InvestmentController {

    @Autowired
    private InvestmentService investmentService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public Investment createInvestment(@RequestBody Investment investment, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	investment.setUser(u);
        return investmentService.saveInvestment(investment);
    }


    @GetMapping("/{id}")
    public InvestmentDto getInvestmentById(@PathVariable int id) {
    	InvestmentDto i =investmentService.getInvestmentById(id);
        return i;
    }

    @PutMapping("/{id}")
    public Investment updateInvestment(@PathVariable int id, 
    		@RequestBody Investment investment, HttpSession session) {
    	int userId = (Integer)session.getAttribute("userId");
    	User u = userService.getUserById(userId);
    	investment.setUser(u);
        investment.setInvestmentId(id);
        return investmentService.saveInvestment(investment);
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable int id) {
        investmentService.deleteInvestment(id);
    }
    
    @PostMapping("/day")
    public ResponseEntity<List<InvestmentDto>> todaysInvestments(@RequestBody DateDto date, HttpSession session) {
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	System.out.println("Session ID in /investments: " + session.getId()+" "+session.isNew());
    	Integer userId  = (Integer) session.getAttribute("userId");
    	if (userId == null) {
            throw new IllegalStateException("User not authenticated");
        }
    	User user = userService.getUserById(userId);
        return ResponseEntity.ok(investmentService.todaysInvestments(newDate, user));
    }
    
    @PostMapping("/month")
    public ResponseEntity<List<InvestmentDto>> monthInvestments(@RequestBody DateDto date, HttpSession session) {
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	System.out.println("Session ID in /investments: " + session.getId()+" "+session.isNew());
    	Integer userId  = (Integer) session.getAttribute("userId");
    	if (userId == null) {
            throw new IllegalStateException("User not authenticated");
        }
    	User user = userService.getUserById(userId);
        return ResponseEntity.ok(investmentService.monthInvestments(newDate, user));
    }
    
    @PostMapping("/year")
    public ResponseEntity<List<InvestmentDto>> yearInvestments(@RequestBody DateDto date, HttpSession session) {
    	
    	LocalDate newDate = LocalDate.of(date.getYear(), date.getMonth(), date.getDay());
    	System.out.println("Session ID in /investments: " + session.getId()+" "+session.isNew());
    	Integer userId  = (Integer) session.getAttribute("userId");
    	if (userId == null) {
            throw new IllegalStateException("User not authenticated");
        }
    	User user = userService.getUserById(userId);
        return ResponseEntity.ok(investmentService.yearInvestments(newDate, user));
    }
}

