package com.app.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.app.dto.ExpenditureDto;
import com.app.entity.Expenditure;
import com.app.entity.User;


public interface ExpenditureRepository extends CrudRepository<Expenditure, Integer> {
	
	@Query("SELECT new com.app.dto.ExpenditureDto(e.expenditureId, e.amount, "
			+ "e.description, e.category, e.subCategory, e.location, e.transactionMode, "
			+ "e.date, e.time) FROM Expenditure e WHERE e.date = :day AND e.user = :user")
    List<ExpenditureDto> daysExpenditures(Date day, User user);

	@Query("SELECT new com.app.dto.ExpenditureDto(e.expenditureId, e.amount, "
	        + "e.description, e.category, e.subCategory, e.location, e.transactionMode, "
	        + "e.date, e.time) "
	        + "FROM Expenditure e "
	        + "WHERE YEAR(e.date) = :year "
	        + "AND MONTH(e.date) = :month "
	        + "AND e.user = :user")
	List<ExpenditureDto> monthExpenditures(@Param("year") int year, 
	                                                @Param("month") int month, 
	                                                @Param("user") User user);
	
	@Query("SELECT new com.app.dto.ExpenditureDto(e.expenditureId, e.amount, "
	        + "e.description, e.category, e.subCategory, e.location, e.transactionMode, "
	        + "e.date, e.time) "
	        + "FROM Expenditure e "
	        + "WHERE e.date BETWEEN :startOfMonth AND :endOfMonth "
	        + "AND e.user = :user")
	List<ExpenditureDto> monthExpenditures(@Param("startOfMonth") LocalDate startOfMonth, 
	                                                @Param("endOfMonth") LocalDate endOfMonth, 
	                                                @Param("user") User user);


	@Query("SELECT new com.app.dto.ExpenditureDto(e.expenditureId, e.amount, "
	        + "e.description, e.category, e.subCategory, e.location, e.transactionMode, "
	        + "e.date, e.time) "
	        + "FROM Expenditure e "
	        + "WHERE e.date BETWEEN :startOfYear AND :endOfYear "
	        + "AND e.user = :user")
	List<ExpenditureDto> yearExpenditures(@Param("startOfYear") LocalDate startOfYear, 
	                                       @Param("endOfYear") LocalDate endOfYear, 
	                                       @Param("user") User user);
	
	@Query("SELECT SUM(e.amount) FROM Expenditure e WHERE e.user = :user")
	Double findSumOfExpenditure( @Param("user") User user);


}
