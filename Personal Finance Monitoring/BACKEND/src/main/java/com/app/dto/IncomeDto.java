package com.app.dto;

import java.sql.Date;
import java.time.LocalTime;

public class IncomeDto {
	private int incomeId;
	private String incomeSource;
	private float incomeAmount;
	private String Description;
	private String modeOfPayment;
	private Date date;
	private LocalTime time;
	public IncomeDto(int incomeId, String incomeSource, float incomeAmount, String description, String modeOfPayment,
			Date date, LocalTime time) {
		super();
		this.incomeId = incomeId;
		this.incomeSource = incomeSource;
		this.incomeAmount = incomeAmount;
		Description = description;
		this.modeOfPayment = modeOfPayment;
		this.date = date;
		this.time = time;
	}
	public int getIncomeId() {
		return incomeId;
	}
	public void setIncomeId(int incomeId) {
		this.incomeId = incomeId;
	}
	public String getIncomeSource() {
		return incomeSource;
	}
	public void setIncomeSource(String incomeSource) {
		this.incomeSource = incomeSource;
	}
	public float getIncomeAmount() {
		return incomeAmount;
	}
	public void setIncomeAmount(float incomeAmount) {
		this.incomeAmount = incomeAmount;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getModeOfPayment() {
		return modeOfPayment;
	}
	public void setModeOfPayment(String modeOfPayment) {
		this.modeOfPayment = modeOfPayment;
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
