package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.entity.Contribution;
import com.wedding.wedding_backend.repository.ContributionRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ContributionService {

    private final ContributionRepository repository;

    public ContributionService(@Qualifier("contributionRepository") ContributionRepository repository) {
        this.repository = repository;
    }

    public List<Contribution> findAll() {
        return repository.findAll();
    }


    public Contribution save(Contribution contribution) {
        return repository.save(contribution);
    }
    public BigDecimal getTotalContributions() {
        return repository.getTotalContributions();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}