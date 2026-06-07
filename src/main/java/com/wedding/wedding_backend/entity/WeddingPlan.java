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

    private String currency;

    public WeddingPlan() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ){
        this.id = id;
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

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}