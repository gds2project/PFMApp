package com.app.methods;

import java.security.SecureRandom;

import com.app.dto.InvestmentDto;
import com.app.dto.UserRegistryDto;
import com.app.entity.Investment;
import com.app.entity.User;
import com.app.entity.UserRegistry;

public class StaticMethods {

	//Method to convert UserRegistry object to User object
	public static User convertToUser(UserRegistry uR) {
		
		return new User(uR.getEmail(), uR.getFirstName(), uR.getLastName(), true, uR.getMobile());
	}
	
	// Method to generate a 6-digit OTP
    public static String generateOTP(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder();

        // Generate OTP
        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10); // Random digit between 0 and 9
            otp.append(digit);
        }

        // Ensure the OTP length is correct, pad with leading zeros if necessary
        while (otp.length() < length) {
            otp.insert(0, '0');
        }

        return otp.toString();
    }
    
    public static UserRegistry convertToRegistry(UserRegistryDto u) {
    	return new UserRegistry(u.getUserRegistryId(), u.getEmail(), u.getPassword(),
    			u.getFirstName(), u.getLastName(), u.getGender(), u.getMobile(), u.getDob(), u.getDoj());
    }
	
    public static InvestmentDto convertToInvestmentDto(Investment i) {
    	InvestmentDto invDto = new InvestmentDto(i.getInvestmentId(), i.getCategory(),
    			i.getIssuer(), i.getQuantity(), i.getUnitCost(), i.getInvestmentDate(),
    			i.getMaturityDate(), i.getMaturityUnitPrice(), i.getDescription());
    	return invDto;
    }
    
    public static void updateExistingUser(UserRegistry oldU, UserRegistry newU) {
    	if(newU.getEmail() != null)
    		oldU.setEmail(newU.getEmail());
    	if(newU.getPassword() != null)
    		oldU.setPassword(newU.getPassword());
    	if(newU.getFirstName() != null)
    		oldU.setFirstName(newU.getFirstName());
    	if(newU.getLastName() != null)
    		oldU.setLastName(newU.getLastName());
    	Character gender = newU.getGender();
    	if(!gender.equals(null))
    		oldU.setGender(newU.getGender());
    	Long mobile = newU.getMobile();
    	if(!mobile.equals(null))
    		oldU.setMobile(mobile);
    	if(newU.getDob() != null)
    		oldU.setDob(newU.getDob());
    	if(newU.getDoj() != null)
    		oldU.setDoj(newU.getDoj());
    	
    }
}
