package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.entity.WeddingPlan;
import com.wedding.wedding_backend.service.WeddingPlanService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plan")
@CrossOrigin(origins = "*")
public class WeddingPlanController {

    private final WeddingPlanService service;

    public WeddingPlanController(
            WeddingPlanService service
    ){
        this.service = service;
    }

    @GetMapping
    public List<WeddingPlan> getAll(){
        return service.findAll();
    }

    @PostMapping
    public WeddingPlan save(
            @RequestBody WeddingPlan plan
    ){
        return service.save(plan);
    }
}