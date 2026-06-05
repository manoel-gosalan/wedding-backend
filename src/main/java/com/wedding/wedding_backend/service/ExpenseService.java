package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.dto.ExpenseDTO;
import com.wedding.wedding_backend.entity.Expense;
import com.wedding.wedding_backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Expense> findAll() {
        return repository.findAll();
    }

    public Expense save(Expense expense) {
        return repository.save(expense);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
    public Expense update(
        Long id,
        ExpenseDTO dto
) {

    Expense expense =
        repository.findById(id)
        .orElseThrow();

    expense.setDescription(
        dto.getDescription()
    );

    expense.setCategory(
        dto.getCategory()
    );

    expense.setValue(
        dto.getValue()
    );

    expense.setExpenseDate(
        dto.getExpenseDate()
    );

    return repository.save(expense);
}
}