package com.wedding.wedding_backend.repository;

import com.wedding.wedding_backend.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;

import org.springframework.data.jpa.repository.Query;



public interface VendorRepository
        extends JpaRepository<Vendor, Long> {
    @Query("""
        SELECT COALESCE(
            SUM(v.paidAmount),
            0
        )
        FROM Vendor v
    """)
    BigDecimal getTotalPaid();

}

