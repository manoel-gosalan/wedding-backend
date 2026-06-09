package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.CategoryBudget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryBudgetRepository
        extends JpaRepository<CategoryBudget, Long> {
}