package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.entity.Vendor;
import com.wedding.wedding_backend.service.VendorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {

    private final VendorService service;

    public VendorController(
            VendorService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Vendor> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Vendor create(
            @RequestBody Vendor vendor
    ) {
        return service.save(vendor);
    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }

    @PutMapping("/{id}")
    public Vendor update(
            @PathVariable Long id,
            @RequestBody Vendor vendor
    ) {

        vendor.setId(id);

        return service.save(vendor);
    }
}