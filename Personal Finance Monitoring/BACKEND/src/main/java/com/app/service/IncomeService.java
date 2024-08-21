package com.app.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.IncomeRepository;
import com.app.dto.IncomeDto;
import com.app.entity.Income;
import com.app.entity.User;

@Service
@Transactional
public class IncomeService {

	@Autowired
    private IncomeRepository incomeRepository;

    public Income saveIncome(Income income) {
        return incomeRepository.save(income);
    }

    public List<Income> getAllIncomes() {
        return (List<Income>) incomeRepository.findAll();
    }

    public Income getIncomeById(Integer id) {
        return incomeRepository.findById(id).orElse(null);
    }

    public void deleteIncome(Integer id) {
        incomeRepository.deleteById(id);
    }
    
    public List<IncomeDto> dayIncome(LocalDate day, User u){
        Date newDay = Date.valueOf(day);
    	List<IncomeDto> l1 = incomeRepository.todaysIncome(newDay, u);
    	return l1;
    }
    
    public List<IncomeDto> getWeeklyIncome(User user) {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
        LocalDate endOfWeek = today.with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));

        return incomeRepository.findWeeklyIncome(startOfWeek, endOfWeek, user);
    }

	public List<IncomeDto> monthIncome(LocalDate date, User u) {
		int year = date.getYear();
		int month = date.getMonthValue();
		YearMonth yearMonth = YearMonth.of(year, month);
		LocalDate endOfMonth = yearMonth.atEndOfMonth();
		LocalDate startOfMonth = LocalDate.of(year, month, 1);
		return incomeRepository.betweenIncome(startOfMonth, endOfMonth, u);
	}

	public List<IncomeDto> yearIncome(LocalDate date, User u) {
		LocalDate start = LocalDate.of(date.getYear(), 1, 1);
		LocalDate end =LocalDate.of(date.getYear(), 12, 31);
		return incomeRepository.betweenIncome(start, end, u);
	}
}
