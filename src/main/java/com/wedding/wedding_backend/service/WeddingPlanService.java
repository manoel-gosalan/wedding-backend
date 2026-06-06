package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.entity.WeddingPlan;
import com.wedding.wedding_backend.repository.WeddingPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeddingPlanService {

    private final WeddingPlanRepository repository;

    public WeddingPlanService(
            WeddingPlanRepository repository
    ){
        this.repository = repository;
    }

    public WeddingPlan save(
            WeddingPlan plan
    ){
        return repository.save(plan);
    }

    public List<WeddingPlan> findAll(){
        return repository.findAll();
    }
}