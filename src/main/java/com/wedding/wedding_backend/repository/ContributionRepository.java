package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;

@Repository

public interface ContributionRepository
        extends JpaRepository<Contribution, Long> {

    @Query("SELECT COALESCE(SUM(c.value), 0) FROM Contribution c")
    BigDecimal getTotalContributions();
}