package com.app.entity;

import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	private String email;
	private String firstName;
	private String lastName;
	//private localdat
	private long mobile;
	@JsonProperty("isActive")
	private boolean isActive;
	private double goal;
	@ManyToMany
	@JoinTable(
			name = "user_contacts",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "friend_user_id")
			)
	private Set<User> contacts = new HashSet<>();
	
	@ManyToMany(mappedBy = "contacts")
	private Set<User> contactOf = new HashSet<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Expenditure> expenditures;
	
	@OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Borrowing> borrowings;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Income> incomes;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Investment> investments;
	
	@ManyToMany
    @JoinTable(
        name = "user_group_mapping",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private Set<UserGroup> userGroups = new HashSet<>();
	@ManyToMany
	@JoinTable(
	        name = "user_split_share",
	        joinColumns = @JoinColumn(name = "user_id"),
	        inverseJoinColumns = @JoinColumn(name = "split_share_id")
	)
	private Set<SplitShare> splitShares = new HashSet<>();

	public User() {
		super();
	}
	public User(String email, String firstName, String lastName, boolean isActive, long mobile) {
		super();
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isActive = isActive;
		this.mobile = mobile;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
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
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Set<User> getContacts() {
		return contacts;
	}

	public void setContacts(Set<User> contacts) {
		this.contacts = contacts;
	}

	public Set<User> getContactOf() {
		return contactOf;
	}

	public void setContactOf(Set<User> contactOf) {
		this.contactOf = contactOf;
	}
	public void addContact(User user, int i) {
		contacts.add(user);
		if(i==0) {
			i++;
			user.addContact(this, i);
		}
		user.getContactOf().add(this);
	}
	public void removeContact(User user, int i) {
		contacts.remove(user);
		if(i ==0) {
			i++;
			user.removeContact(this, i);
		}
		user.getContactOf().remove(this);
	}

	public Set<Expenditure> getExpenditures() {
		return expenditures;
	}
	
	
	public Set<Borrowing> getBorrowings() {
		return borrowings;
	}
	public void setBorrowings(Set<Borrowing> borrowings) {
		this.borrowings = borrowings;
	}
	public void setExpenditures(Set<Expenditure> expenditures) {
		this.expenditures = expenditures;
	}

	public Set<Income> getIncomes() {
		return incomes;
	}

	public void setIncomes(Set<Income> incomes) {
		this.incomes = incomes;
	}

	public Set<Investment> getInvestments() {
		return investments;
	}

	public void setInvestments(Set<Investment> investments) {
		this.investments = investments;
	}

	public Set<UserGroup> getUserGroups() {
		return userGroups;
	}

	public void setUserGroups(Set<UserGroup> userGroups) {
		this.userGroups = userGroups;
	}

	public Set<SplitShare> getSplitShares() {
		return splitShares;
	}

	public void setSplitShares(Set<SplitShare> splitShares) {
		this.splitShares = splitShares;
	}
	public long getMobile() {
		return mobile;
	}
	public void setMobile(long mobile) {
		this.mobile = mobile;
	}
	public double getGoal() {
		return goal;
	}
	public void setGoal(double goal) {
		this.goal = goal;
	}
	
	
	
}
