package com.wedding.wedding_backend.mapper;

import com.wedding.wedding_backend.dto.ExpenseDTO;
import com.wedding.wedding_backend.entity.Expense;

public class ExpenseMapper {

    public static Expense toEntity(ExpenseDTO dto) {

        Expense expense = new Expense();

        expense.setDescription(dto.getDescription());
        expense.setCategory(dto.getCategory());
        expense.setValue(dto.getValue());

        return expense;
    }
}