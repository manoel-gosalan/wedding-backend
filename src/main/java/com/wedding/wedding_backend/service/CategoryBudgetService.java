package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.entity.CategoryBudget;
import com.wedding.wedding_backend.repository.CategoryBudgetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryBudgetService {

    private final CategoryBudgetRepository repository;

    public CategoryBudgetService(
            CategoryBudgetRepository repository
    ) {
        this.repository = repository;
    }

    public List<CategoryBudget> findAll() {
        return repository.findAll();
    }

    public CategoryBudget save(
            CategoryBudget categoryBudget
    ) {
        return repository.save(categoryBudget);
    }


    public void delete(Long id) {
        repository.deleteById(id);
    }

    public CategoryBudget update(
            Long id,
            CategoryBudget categoryBudget
    ) {

        CategoryBudget existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setName(
                categoryBudget.getName()
        );

        existing.setBudget(
                categoryBudget.getBudget()
        );

        return repository.save(existing);
    }
}