package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.entity.Contribution;
import com.wedding.wedding_backend.service.ContributionService;
import org.springframework.web.bind.annotation.*;

import  java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin("*")
public class ContributionController {

    private final ContributionService service;

    public ContributionController(ContributionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Contribution> findAll() {
        return service.findAll();
    }

    @PostMapping
    public Contribution save(@RequestBody Contribution contribution) {
        return service.save(contribution);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/total")
    public BigDecimal getTotalContributions() {
        return service.getTotalContributions();
    }
}