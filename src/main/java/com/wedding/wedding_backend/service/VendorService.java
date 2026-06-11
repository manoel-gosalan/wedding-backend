package com.wedding.wedding_backend.service;

import com.wedding.wedding_backend.entity.Vendor;
import com.wedding.wedding_backend.repository.VendorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {

    private final VendorRepository repository;

    public VendorService(
            VendorRepository repository
    ) {
        this.repository = repository;
    }

    public List<Vendor> findAll() {
        return repository.findAll();
    }

    public Vendor save(
            Vendor vendor
    ) {

        if (
                vendor.getPaidAmount()
                        .compareTo(
                                vendor.getTotalAmount()
                        ) > 0
        ) {

            throw new RuntimeException(
                    "Valor pago não pode ser maior que o valor total."
            );
        }

        if (
                vendor.getTotalAmount() == null ||
                        vendor.getPaidAmount() == null
        ) {
            throw new RuntimeException(
                    "Valores obrigatórios."
            );
        }

        return repository.save(vendor);
    }

    public void delete(
            Long id
    ) {
        repository.deleteById(id);
    }


}