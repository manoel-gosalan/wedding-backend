package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.entity.CategoryBudget;
import com.wedding.wedding_backend.service.CategoryBudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category-budgets")
@CrossOrigin(origins = "*")
public class CategoryBudgetController {

    private final CategoryBudgetService service;

    public CategoryBudgetController(
            CategoryBudgetService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryBudget> getAll() {
        return service.findAll();
    }

    @PostMapping
    public CategoryBudget create(
            @RequestBody CategoryBudget categoryBudget
    ) {

        System.out.println("NAME = "
                + categoryBudget.getName());

        System.out.println("BUDGET = "
                + categoryBudget.getBudget());

        return service.save(categoryBudget);
    }

    @PutMapping("/{id}")
    public CategoryBudget update(
            @PathVariable Long id,
            @RequestBody CategoryBudget categoryBudget
    ) {
        return service.update(id, categoryBudget);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }

}