package com.wedding.wedding_backend.dto;

import java.math.BigDecimal;

public class ExchangeRateDTO {

    private BigDecimal rate;

    public ExchangeRateDTO() {
    }

    public ExchangeRateDTO(BigDecimal rate) {
        this.rate = rate;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }
}