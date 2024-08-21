package com.app.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserRegistry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userRegistryId;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private char gender;
	private long mobile;
	private Date dob;
	private Date doj; //date of joining the application
	
	
	public UserRegistry() {
		super();
	}
	public UserRegistry(int userRegistryId, String email, String password, String firstName, String lastName,
			char gender, long mobile, Date dob, Date doj) {
		super();
		this.userRegistryId = userRegistryId;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.mobile = mobile;
		this.dob = dob;
		this.doj = doj;
	}
	public int getUserRegistryId() {
		return userRegistryId;
	}
	public void setUserRegistryId(int userRegistryId) {
		this.userRegistryId = userRegistryId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public char getGender() {
		return gender;
	}
	public void setGender(char gender) {
		this.gender = gender;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getDoj() {
		return doj;
	}
	public void setDoj(Date doj) {
		this.doj = doj;
	}
	public long getMobile() {
		return mobile;
	}
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	
	
}
