package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.dto.ExchangeRateDTO;
import com.wedding.wedding_backend.service.ExchangeRateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExchangeRateController {

    private final ExchangeRateService exchangeRateService;

    public ExchangeRateController(
            ExchangeRateService exchangeRateService
    ) {
        this.exchangeRateService =
                exchangeRateService;
    }

    @GetMapping("/api/exchange-rate")
    public ExchangeRateDTO getExchangeRate() {

        return new ExchangeRateDTO(
                exchangeRateService.getEuroRate()
        );
    }
}