package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.dto.DashboardDTO;
import com.wedding.wedding_backend.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(
            DashboardService service
    ) {
        this.service = service;
    }

    @GetMapping
    public DashboardDTO getDashboard() {
        return service.getDashboard();
    }
}