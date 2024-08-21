package com.app.entity;



import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class SplitShare {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int splitId;
	private float shareAmount;
	@ManyToOne
    @JoinColumn(name = "lending_id")
    private Lending lending;
	@ManyToMany(mappedBy = "splitShares")
    private Set<User> users = new HashSet<>();
	
	public int getSplitId() {
		return splitId;
	}
	public void setSplitId(int splitId) {
		this.splitId = splitId;
	}
	public float getShareAmount() {
		return shareAmount;
	}
	public void setShareAmount(float shareAmount) {
		this.shareAmount = shareAmount;
	}
	public Lending getLending() {
		return lending;
	}
	public void setLending(Lending lending) {
		this.lending = lending;
	}
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	
	

}
