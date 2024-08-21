package com.app.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.dao.InvestmentRepository;
import com.app.dto.InvestmentDto;
import com.app.entity.Investment;
import com.app.entity.User;
import com.app.methods.StaticMethods;

@Service
@Transactional
public class InvestmentService {

	@Autowired
    private InvestmentRepository investmentRepository;

    public Investment saveInvestment(Investment investment) {
        return investmentRepository.save(investment);
    }

    public List<Investment> getAllInvestments() {
        return (List<Investment>) investmentRepository.findAll();
    }
    
    public InvestmentDto getInvestmentById(int id) {
    	InvestmentDto i = StaticMethods.convertToInvestmentDto(investmentRepository.findById(id).orElse(null));
        return i;
    }

    public void deleteInvestment(Integer id) {
        investmentRepository.deleteById(id);
    }
    
    public List<InvestmentDto> todaysInvestments(LocalDate date, User u){
        Date newDay = Date.valueOf(date);
    	List<InvestmentDto> l1 = investmentRepository.todaysInvestments(newDay, u);
    	return l1;
    }

	public List<InvestmentDto> monthInvestments(LocalDate date, User user) {
		int year = date.getYear();
		int month = date.getMonthValue();
		YearMonth yearMonth = YearMonth.of(year, month);
		LocalDate endOfMonth = yearMonth.atEndOfMonth();
		LocalDate startOfMonth = LocalDate.of(year, month, 1);
		return investmentRepository.betweenInvestment(startOfMonth, endOfMonth, user);
	}

	public List<InvestmentDto> yearInvestments(LocalDate date, User user) {
		LocalDate start = LocalDate.of(date.getYear(), 1, 1);
		LocalDate end =LocalDate.of(date.getYear(), 12, 31);
		return investmentRepository.betweenInvestment(start, end, user);
	}
}
