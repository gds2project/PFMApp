package com.app.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.dto.GoalDto;
import com.app.dto.UserDto;
import com.app.dto.UserRegistryDto;
import com.app.entity.User;
import com.app.entity.UserRegistry;
import com.app.methods.StaticMethods;
import com.app.service.EmailService;
import com.app.service.UserService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

//	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;
    

    @PostMapping("/register")
    public ResponseEntity<Integer> createUser(@RequestBody UserRegistryDto dto, HttpSession session) {
//    	logger.debug("Received request to create user: {}", user);
    	String email = (String)session.getAttribute("email");
    	String otp = (String)session.getAttribute("otp");
    	if(otp.equals(dto.getOtp()) && email.equals(dto.getEmail())) {
    		UserRegistry user = StaticMethods.convertToRegistry(dto);
    		return ResponseEntity.ok(userService.saveUser(user));
    	}else
    		return ResponseEntity.ok(2); // 2 for wrong otp
        
    }
    
    @PostMapping("/verifyOtp")
    public ResponseEntity<Integer> verifyOtp(@RequestBody UserRegistryDto dto, HttpSession session){
    	String otp = (String)session.getAttribute("otp");
    	String email = (String)session.getAttribute("email");
    	if(otp.equals(dto.getOtp()) && email.equals(dto.getEmail()))
    		return ResponseEntity.ok(1);
    	else
    		return ResponseEntity.ok(0);
    }
    
    @SuppressWarnings("rawtypes")
	@PostMapping("/sendOtp")
    public ResponseEntity sendOtp(@RequestBody UserRegistryDto user, HttpSession session) {
    	session.setAttribute("email", user.getEmail());
    	String otp = emailService.sendOtp(user.getEmail());
    	session.setAttribute("otp", otp);
    	return ResponseEntity.ok().build();
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserRegistry user, HttpSession session) {
//    	logger.debug("Received request to create user: {}", user);
    	User u = userService.loginUser(user);
    	if( u == null)
        return ResponseEntity.badRequest().build();
    	else {
    		Integer id = u.getUserId();
    		session.setAttribute("userId", id);
    		System.out.println("Session ID in /login: " + session.getId()+" "+session.isNew());
    		return ResponseEntity.ok(u);
    	}
    }
    
    @GetMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
//    	logger.debug("Received request to create user: {}", user);
    	session.invalidate();
        return ResponseEntity.ok("");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user")
    public User getUserById(HttpSession session) {
    	int id = (Integer)session.getAttribute("userId");
    	System.out.println(id);
        return userService.getUserById(id);
    }
    
    @GetMapping("/checkSession")
    public Map<String, Boolean> checkSession(HttpSession session) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("isAuthenticated", session.getAttribute("userId") != null);
        return response;
    }

    @SuppressWarnings("rawtypes")
	@PutMapping("/users")
    public ResponseEntity updateUser(@RequestBody UserRegistry userR, HttpSession session) {
    	Integer id = (Integer)session.getAttribute("userId");
    	userR.setUserRegistryId(id);
    	int status = userService.updateUser(userR);
        if( status == 1)
        	return ResponseEntity.ok().build();
        else return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
    
    @PostMapping("findUser")
    public ResponseEntity<UserDto> findUser(@RequestBody User u) {
    	
    	return ResponseEntity.ok(userService.findUser(u));
    }
    
    @SuppressWarnings("rawtypes")
    @DeleteMapping("/contact")
    public ResponseEntity deleteContact(@RequestBody User contact, HttpSession session){
    	contact = userService.getUserById(contact.getUserId());
    	Integer userId = (Integer)session.getAttribute("userId");
    	User user = userService.getUserById(userId);
    	contact = userService.getUserById(contact.getUserId());
    	userService.removeContact(user, contact);
    	return ResponseEntity.ok().build();
    }
    
    @PostMapping("/contact")
    public ResponseEntity<Integer> addContact(@RequestBody User contact, HttpSession session){
    	Integer userId = (Integer)session.getAttribute("userId");
    	return ResponseEntity.ok(userService.addContact(contact, userId));
    }
    
    @GetMapping("/contacts")
    public ResponseEntity<Set<UserDto>> getContacts(HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	Set<UserDto> contacts = userService.findContactsByUserId(userId);
    	return ResponseEntity.ok(contacts);
    }
    @GetMapping("/balance")
    public ResponseEntity<Double> getBalance(HttpSession session){
    	int id = (Integer)session.getAttribute("userId");
    	double balance = userService.getBalance(id);
    	return ResponseEntity.ok(balance);
    }
    @GetMapping("/getGoal")
    public ResponseEntity<GoalDto> getGoal(HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	User user = userService.getUserById(userId);
    	GoalDto goal = userService.getGoal(user);
    	return ResponseEntity.ok(goal);
    }
    
    @PostMapping("/setGoal")
    public ResponseEntity<GoalDto> setGoal(@RequestBody GoalDto goal, HttpSession session){
    	int userId = (Integer)session.getAttribute("userId");
    	User user = userService.getUserById(userId);
    	goal = userService.setGoal(user, goal);
    	return ResponseEntity.ok(goal);
    }
}
