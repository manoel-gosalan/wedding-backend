package com.wedding.wedding_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DashboardDTO {

    private BigDecimal targetBudget;
    private BigDecimal monthlySaving;
    private BigDecimal currentSavings;
    private BigDecimal totalExpenses;
    private BigDecimal remainingAmount;

    private LocalDate weddingDate;

    public DashboardDTO() {
    }

    public BigDecimal getTargetBudget() {
        return targetBudget;
    }

    public void setTargetBudget(BigDecimal targetBudget) {
        this.targetBudget = targetBudget;
    }

    public BigDecimal getCurrentSavings() {
        return currentSavings;
    }

    public void setCurrentSavings(BigDecimal currentSavings) {
        this.currentSavings = currentSavings;
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(BigDecimal totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public BigDecimal getMonthlySaving() {
        return monthlySaving;
    }

    public void setMonthlySaving(BigDecimal monthlySaving) {
        this.monthlySaving = monthlySaving;
    }

    public LocalDate getWeddingDate() {
        return weddingDate;
    }

    public void setWeddingDate(LocalDate weddingDate) {
        this.weddingDate = weddingDate;
    }
}