package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.dto.DashboardDTO;
import com.wedding.wedding_backend.entity.WeddingPlan;
import com.wedding.wedding_backend.repository.ContributionRepository;
import com.wedding.wedding_backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;
import com.wedding.wedding_backend.repository.VendorRepository;

import java.math.BigDecimal;




@Service
public class DashboardService {

    private final WeddingPlanService weddingPlanService;
    private final ContributionRepository contributionRepository;
    private final ExpenseRepository expenseRepository;
    private final ExchangeRateService exchangeRateService;
    private final VendorRepository vendorRepository;



    public DashboardService(
            WeddingPlanService weddingPlanService,
            ContributionRepository contributionRepository,
            ExpenseRepository expenseRepository,
            VendorRepository vendorRepository,
            ExchangeRateService exchangeRateService

    ) {
        this.weddingPlanService = weddingPlanService;
        this.contributionRepository = contributionRepository;
        this.expenseRepository = expenseRepository;
        this.vendorRepository = vendorRepository;
        this.exchangeRateService = exchangeRateService;
    }

    public DashboardDTO getDashboard() {

        WeddingPlan plan =
                weddingPlanService.findLatest();

        BigDecimal eurToBrl = exchangeRateService.getEuroRate();


        if (plan == null) {
            return new DashboardDTO();
        }

        String currency =
                plan.getCurrency();

        BigDecimal initialSavings =
                BigDecimal.valueOf(
                        plan.getCurrentSavings()
                );

        if ("EUR".equals(currency)) {

            initialSavings =
                    initialSavings.multiply(
                            eurToBrl
                    );
        }

        BigDecimal totalContributions =
                contributionRepository.getTotalContributions();

        BigDecimal totalSaved =
                initialSavings.add(
                        totalContributions
                );

        BigDecimal expenseTotal =
                expenseRepository.getTotalExpenses();
        if (expenseTotal == null) {
            expenseTotal = BigDecimal.ZERO;
        }

        BigDecimal vendorPaid =
                vendorRepository.getTotalPaid();
        if (vendorPaid == null) {
            vendorPaid = BigDecimal.ZERO;
        }

        BigDecimal totalExpenses =
                expenseTotal.add(
                        vendorPaid
                );

        BigDecimal targetBudget =
                BigDecimal.valueOf(
                        plan.getTargetBudget()
                );

        BigDecimal remainingAmount =
                targetBudget
                        .subtract(totalSaved)
                        .subtract(totalExpenses);

        DashboardDTO dashboard =
                new DashboardDTO();


        dashboard.setTargetBudget(
                targetBudget
        );

        dashboard.setCurrentSavings(
                totalSaved
        );

        dashboard.setTotalExpenses(
                totalExpenses
        );

        dashboard.setRemainingAmount(
                remainingAmount
        );

        BigDecimal monthlySaving =
                BigDecimal.valueOf(
                        plan.getMonthlySaving()
                );

        if ("EUR".equals(currency)) {

            monthlySaving =
                    monthlySaving.multiply(
                            eurToBrl
                    );
        }

        dashboard.setMonthlySaving(
                monthlySaving
        );

        dashboard.setWeddingDate(
                plan.getWeddingDate()
        );


        return dashboard;
    }
}