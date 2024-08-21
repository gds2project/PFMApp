package com.app.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.app.dto.InvestmentDto;
import com.app.entity.Investment;
import com.app.entity.User;

public interface InvestmentRepository extends CrudRepository<Investment, Integer> {

	@Query("SELECT new com.app.dto.InvestmentDto(i.investmentId, i.category, i.issuer,"
			+ " i.quantity, i.unitCost, i.investmentDate, i.maturityDate, i.maturityUnitPrice,"
			+ " i.description) FROM Investment i WHERE i.investmentDate = :day AND i.user = :user")
    List<InvestmentDto> todaysInvestments(Date day, User user);

	@Query("SELECT new com.app.dto.InvestmentDto(i.investmentId, i.category, i.issuer,"
			+ " i.quantity, i.unitCost, i.investmentDate, i.maturityDate, i.maturityUnitPrice,"
			+ " i.description) FROM Investment i WHERE i.investmentDate BETWEEN :start AND :end AND i.user = :user")
	List<InvestmentDto> betweenInvestment(LocalDate start, LocalDate end, User user);

	@Query("SELECT SUM(i.quantity * i.unitCost) FROM Investment i WHERE i.user = :user")
	Double findSumOfInvestment(@Param("user") User user);

	
}
