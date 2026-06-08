package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.dto.DashboardDTO;
import com.wedding.wedding_backend.entity.Expense;
import com.wedding.wedding_backend.entity.WeddingPlan;
import com.wedding.wedding_backend.repository.ContributionRepository;
import com.wedding.wedding_backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    private final WeddingPlanService weddingPlanService;
    private final ContributionRepository contributionRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardService(
            WeddingPlanService weddingPlanService,
            ContributionRepository contributionRepository,
            ExpenseRepository expenseRepository
    ) {
        this.weddingPlanService = weddingPlanService;
        this.contributionRepository = contributionRepository;
        this.expenseRepository = expenseRepository;
    }

    public DashboardDTO getDashboard() {

        WeddingPlan plan =
                weddingPlanService.findLatest();

        if (plan == null) {
            return new DashboardDTO();
        }

        BigDecimal initialSavings =
                BigDecimal.valueOf(
                        plan.getCurrentSavings()
                );

        BigDecimal totalContributions =
                contributionRepository.getTotalContributions();

        BigDecimal totalSaved =
                initialSavings.add(
                        totalContributions
                );

        BigDecimal totalExpenses =
                expenseRepository.getTotalExpenses();

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

        dashboard.setMonthlySaving(
                BigDecimal.valueOf(
                        plan.getMonthlySaving()
                )
        );

        dashboard.setWeddingDate(
                plan.getWeddingDate()
        );

        return dashboard;
    }
}