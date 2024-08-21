package com.app.dto;

import java.sql.Date;
import java.time.LocalTime;

public class ExpenditureDto {

	private int expenditureId;
	private float amount;
	private String description;
	private String category;
	private String subCategory;
	private String location;
	private String transactionMode; //1:cash, 2:Bank Account(Online)
	private Date date;
	private LocalTime time;
	public ExpenditureDto(int expenditureId, float amount, String description, String category, String subCategory,
			String location, String transactionMode, Date date, LocalTime time) {
		super();
		this.expenditureId = expenditureId;
		this.amount = amount;
		this.description = description;
		this.category = category;
		this.subCategory = subCategory;
		this.location = location;
		this.transactionMode = transactionMode;
		this.date = date;
		this.time = time;
	}
	public int getExpenditureId() {
		return expenditureId;
	}
	public void setExpenditureId(int expenditureId) {
		this.expenditureId = expenditureId;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getTransactionMode() {
		return transactionMode;
	}
	public void setTransactionMode(String transactionMode) {
		this.transactionMode = transactionMode;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	
}
