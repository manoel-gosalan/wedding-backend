package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}