package com.wedding.wedding_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.math.BigDecimal;

@Service
public class ExchangeRateService {

    private final RestClient restClient;

    public ExchangeRateService() {

        this.restClient =
                RestClient.builder()
                        .baseUrl(
                                "https://economia.awesomeapi.com.br"
                        )
                        .build();
    }

    public BigDecimal getEuroRate() {

        JsonNode response =
                restClient.get()
                        .uri("/json/last/EUR-BRL")
                        .retrieve()
                        .body(JsonNode.class);

        System.out.println("RESPOSTA API:");
        System.out.println(response);

        return new BigDecimal(
                response
                        .get("EURBRL")
                        .get("bid")
                        .asText()
        );
    }
}