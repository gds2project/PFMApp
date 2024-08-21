package com.app.dao;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.app.dto.UserDto;
import com.app.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT u FROM User u WHERE u.email = :email ")
    User findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.mobile = :mobile ")
    User findByMobile(long mobile);
	
	@Query("SELECT new com.app.dto.UserDto(u.userId, u.email, u.firstName, u.lastName) " +
	           "FROM User u JOIN u.contacts c WHERE c.userId = :userId")
	    Set<UserDto> findContactsByUserId(@Param("userId") int userId);
	
	@Query("SELECT new com.app.dto.UserDto(u.userId, u.email, u.firstName, u.lastName) " +
	           "FROM User u JOIN u.contacts c WHERE u.userId = :userId")
	    Set<UserDto> getUser(@Param("userId") int userId);
}
