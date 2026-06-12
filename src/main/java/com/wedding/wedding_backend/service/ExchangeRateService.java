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

        try {

            JsonNode response =
                    restClient.get()
                            .uri("/json/last/EUR-BRL")
                            .retrieve()
                            .body(JsonNode.class);

            System.out.println(
                    "API RESPONSE: " + response
            );

            if (
                    response == null ||
                            response.get("EURBRL") == null ||
                            response.get("EURBRL").get("bid") == null
            ) {

                return BigDecimal.valueOf(5.92);
            }

            return new BigDecimal(
                    response
                            .get("EURBRL")
                            .get("bid")
                            .asText()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return BigDecimal.valueOf(5.92);
        }
    }
}