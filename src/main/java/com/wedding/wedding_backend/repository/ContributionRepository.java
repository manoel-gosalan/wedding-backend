package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributionRepository
        extends JpaRepository<Contribution, Long> {
}