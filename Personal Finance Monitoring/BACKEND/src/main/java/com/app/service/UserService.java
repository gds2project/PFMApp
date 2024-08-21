package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.ExpenditureRepository;
import com.app.dao.IncomeRepository;
import com.app.dao.InvestmentRepository;
import com.app.dao.UserRegistryRepository;
import com.app.dao.UserRepository;
import com.app.dto.GoalDto;
import com.app.dto.UserDto;
import com.app.entity.User;
import com.app.entity.UserRegistry;
import com.app.methods.StaticMethods;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserRegistryRepository userRegistryRepository;
    
    @Autowired
    private ExpenditureRepository expRepo;
    
    @Autowired
    private IncomeRepository incomeRepo;
    
    @Autowired
    private InvestmentRepository investRepo;
    
    

    public int saveUser(UserRegistry userRegistry) {		//returns 1 if successfully registered,
    	
    	User user = StaticMethods.convertToUser(userRegistry);
    	String email = user.getEmail();
    	email = email.trim();
    	User u = userRepository.findByEmail(email);
    	
    	if(u==null) {
    		userRegistry = userRegistryRepository.save(userRegistry);
    		userRepository.save(user);
    		return 1;
    	}
    	else
    		return 0;
    }
    public int updateUser(UserRegistry newUserR) { //updated data received
    	UserRegistry oldUserR = userRegistryRepository.findById(newUserR.getUserRegistryId()).orElse(null);		//get existing data
    	StaticMethods.updateExistingUser(oldUserR, newUserR);
    	User user = StaticMethods.convertToUser(oldUserR);
    	user.setUserId(oldUserR.getUserRegistryId());
    	user = userRepository.save(user);
    	oldUserR = userRegistryRepository.save(oldUserR);
    	if(user != null && oldUserR != null)
    		return 1;
    	else return 0;
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User getUserById(Integer id) {
        User u = userRepository.findById(id).orElse(null);
        System.out.println(u.getInvestments());
    	return u;
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
    
    public User loginUser(UserRegistry userRegistry) {
    	UserRegistry u = userRegistryRepository.findByEmailAndPassword(userRegistry.getEmail(), userRegistry.getPassword());
    	if(u != null)
    	return userRepository.findByEmail(u.getEmail());
    	else return null;
    	
    }
    public UserDto findUser(User u) {
    	User user =null;
    	user = userRepository.findByEmail(u.getEmail());
    	if(user != null)
    		return UserDto.convertToUserDto(user);
    	else
    		user = userRepository.findByMobile(u.getMobile());
    	if(user != null)
    		return UserDto.convertToUserDto(user);
    	else return null;
    	
    }
    
    public int addContact(User contact, int userId) {
    	User user = getUserById(userId);
    	User newContact = null; 
    	newContact = userRepository.findByEmail(contact.getEmail());
    	if(newContact == null)
    		newContact = userRepository.findByMobile(contact.getMobile());
    	user.addContact(newContact, 0);
    	User returnUser= null;
    	returnUser = userRepository.save(user);
    	if(returnUser != null)
    		return 1;
    	else
    		return 0;
    }
    
    public Set<UserDto> findContactsByUserId(int id){
    	return userRepository.findContactsByUserId(id);
    }
	public void removeContact(User user, User contact) {
		user.removeContact(contact, 0);
		
	}
	public Double getBalance(int id) {
		User u = userRepository.findById(id).orElse(null);
		double exp = expRepo.findSumOfExpenditure(u);
		double income = incomeRepo.findSumOfIncome(u);
		double invest = investRepo.findSumOfInvestment(u);
		double balance = exp + income + invest;
		return balance;
	}
	public GoalDto getGoal(User user) {
		GoalDto goal = new GoalDto();
    	goal.setGoalP(user.getGoal());
    	double income = incomeRepo.findSumOfIncome(user);
		double invest = investRepo.findSumOfInvestment(user);
		double investGoal = (income * goal.getGoalP())/100;
		double fulfilP = (invest/investGoal)*100;
		goal.setFulfilP(fulfilP);
		return goal;
	}
	
	public GoalDto setGoal(User user, GoalDto goal) {
		user.setGoal(goal.getGoalP());
		userRepository.save(user);
		goal = getGoal(user);
		return goal;
	}
}

