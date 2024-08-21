package com.app.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.dao.ExpenditureRepository;
import com.app.dto.ExpenditureDto;
import com.app.entity.Expenditure;
import com.app.entity.User;

@Service
@Transactional
public class ExpenditureService {

	@Autowired
    private ExpenditureRepository expenditureRepository;

    public Expenditure saveExpenditure(Expenditure expenditure) {
        return expenditureRepository.save(expenditure);
    }

    public List<Expenditure> getAllExpenditures() {
        return (List<Expenditure>) expenditureRepository.findAll();
    }

    public Expenditure getExpenditureById(Integer id) {
        return expenditureRepository.findById(id).orElse(null);
    }

    public void deleteExpenditure(Integer id) {
        expenditureRepository.deleteById(id);
    }
    public List<ExpenditureDto> todaysExpenditures( LocalDate day, User u){
        Date newDay = Date.valueOf(day);
    	List<ExpenditureDto> l1 = expenditureRepository.daysExpenditures(newDay, u);
    	return l1;
    }

	public List<ExpenditureDto> monthExpenditures(LocalDate date, User u) {
		int year = date.getYear();
		int month = date.getMonthValue();
		YearMonth yearMonth = YearMonth.of(year, month);
		LocalDate endOfMonth = yearMonth.atEndOfMonth();
		LocalDate startOfMonth = LocalDate.of(year, month, 1);
		return expenditureRepository.monthExpenditures(startOfMonth, endOfMonth, u);
	}

	public List<ExpenditureDto> yearExpenditures(LocalDate date, User u) {
		LocalDate start = LocalDate.of(date.getYear(), 1, 1);
		LocalDate end =LocalDate.of(date.getYear(), 12, 31);
		return expenditureRepository.yearExpenditures(start, end, u);
	}
}
