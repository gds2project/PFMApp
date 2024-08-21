package com.app.dto;

import com.app.entity.User;

public class UserDto {

	private int userId;
	private String email;
	private String firstName;
	private String lastName;
	private long mobile;
	
	public UserDto(String email, String firstName, String lastName, long mobile) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobile = mobile;
	}
	
	public UserDto(int userId, String email, String firstName, String lastName) {
		super();
		this.userId = userId;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public long getMobile() {
		return mobile;
	}
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	
	public static UserDto convertToUserDto(User u) {
		return new UserDto(u.getEmail(), u.getFirstName(), u.getLastName(), u.getMobile());
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
}
