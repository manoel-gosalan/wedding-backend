package com.wedding.wedding_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wedding_plan")
public class WeddingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double targetBudget;

    private Double currentSavings;

    private Double monthlySaving;

    private LocalDate weddingDate;

    public WeddingPlan() {
    }

    public Long getId() {
        return id;
    }

    public Double getTargetBudget() {
        return targetBudget;
    }

    public void setTargetBudget(Double targetBudget) {
        this.targetBudget = targetBudget;
    }

    public Double getCurrentSavings() {
        return currentSavings;
    }

    public void setCurrentSavings(Double currentSavings) {
        this.currentSavings = currentSavings;
    }

    public Double getMonthlySaving() {
        return monthlySaving;
    }

    public void setMonthlySaving(Double monthlySaving) {
        this.monthlySaving = monthlySaving;
    }

    public LocalDate getWeddingDate() {
        return weddingDate;
    }

    public void setWeddingDate(LocalDate weddingDate) {
        this.weddingDate = weddingDate;
    }
}