package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.dto.ExpenseDTO;
import com.wedding.wedding_backend.entity.Expense;
import com.wedding.wedding_backend.mapper.ExpenseMapper;
import com.wedding.wedding_backend.service.ExpenseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Expense> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody @Valid ExpenseDTO dto) {
        return service.save(
                ExpenseMapper.toEntity(dto)
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}