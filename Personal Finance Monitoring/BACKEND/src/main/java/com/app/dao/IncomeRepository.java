package com.app.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.app.dto.IncomeDto;
import com.app.entity.Income;
import com.app.entity.User;


public interface IncomeRepository extends CrudRepository<Income, Integer> {

	@Query("SELECT new com.app.dto.IncomeDto(i.incomeId, i.incomeSource, i.incomeAmount, i.Description,"
			+ " i.modeOfPayment, i.date, i.time) FROM Income i WHERE i.date = :day AND i.user = :user")
    List<IncomeDto> todaysIncome(Date day, User user);
	
	
	@Query("SELECT new com.app.dto.IncomeDto(i.incomeId, i.incomeSource, i.incomeAmount, i.Description,"
            + " i.modeOfPayment, i.date, i.time) FROM Income i WHERE i.date BETWEEN :startDate AND :endDate AND i.user = :user")
    List<IncomeDto> findWeeklyIncome(@Param("startDate") LocalDate startDate, 
                                     @Param("endDate") LocalDate endDate, 
                                     @Param("user") User user);


	@Query("SELECT new com.app.dto.IncomeDto(i.incomeId, i.incomeSource, i.incomeAmount, i.Description,"
	        + " i.modeOfPayment, i.date, i.time) FROM Income i WHERE i.date BETWEEN :startDate AND :endDate AND i.user = :user")
	List<IncomeDto> betweenIncome(LocalDate startDate, LocalDate endDate, User user);
	
	@Query("SELECT SUM(i.incomeAmount) FROM Income i WHERE i.user = :user")
	Double findSumOfIncome( @Param("user") User user);

}
