package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.entity.Contribution;
import com.wedding.wedding_backend.repository.ContributionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributionService {

    private final ContributionRepository repository;

    public ContributionService(ContributionRepository repository) {
        this.repository = repository;
    }

    public List<Contribution> findAll() {
        return repository.findAll();
    }

    public Contribution save(Contribution contribution) {
        return repository.save(contribution);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}