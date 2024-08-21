package com.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.app.methods.StaticMethods;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    

    public void sendMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("projectinfoway@gmail.com"); // Set the "from" email address by default.
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }
    
    public String sendOtp(String toEmail) {
    	String otp = StaticMethods.generateOTP(6);
    	String message = "Otp to register your account is: "+otp+" please do not share it with anyone";
    	String subject = "Otp for Finances tracking application";
    	sendMessage(toEmail, subject, message);
    	return otp;
    }
}
