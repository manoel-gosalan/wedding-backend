package com.wedding.wedding_backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "vendor")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @PositiveOrZero
    private BigDecimal totalAmount;

    @PositiveOrZero
    private BigDecimal paidAmount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public Vendor() {
    }

    public BigDecimal getRemainingAmount() {

        if (totalAmount == null) {
            return BigDecimal.ZERO;
        }

        if (paidAmount == null) {
            return totalAmount;
        }

        return totalAmount.subtract(
                paidAmount
        );
    }






}