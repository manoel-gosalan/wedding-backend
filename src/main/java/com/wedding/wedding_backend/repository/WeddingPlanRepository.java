package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.WeddingPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeddingPlanRepository
        extends JpaRepository<WeddingPlan, Long> {

    WeddingPlan id(Long id);
}