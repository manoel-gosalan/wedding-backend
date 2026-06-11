package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.dto.ExpenseDTO;
import com.wedding.wedding_backend.entity.Expense;
import com.wedding.wedding_backend.mapper.ExpenseMapper;
import com.wedding.wedding_backend.pdf.PdfService;
import com.wedding.wedding_backend.service.DashboardService;
import com.wedding.wedding_backend.service.ExpenseService;
import com.wedding.wedding_backend.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.wedding.wedding_backend.dto.DashboardDTO;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    
    private final PdfService pdfService;
    private final ExpenseService service;
    private final DashboardService dashboardService;
    private final VendorService vendorService;


    @GetMapping
    public List<Expense> getAll() {
        return service.findAll();
    }

    @PostMapping
    public Expense create(@RequestBody @Valid ExpenseDTO dto) {
        return service.save(
                ExpenseMapper.toEntity(dto));
    }


    public ExpenseController(
            ExpenseService service,
            PdfService pdfService,
            DashboardService dashboardService,
            VendorService vendorService) {
        this.service = service;
        this.pdfService = pdfService;
        this.dashboardService = dashboardService;
        this.vendorService = vendorService;

    }

    @PutMapping("/{id}")
    public Expense update(
            @PathVariable Long id,
            @RequestBody @Valid ExpenseDTO dto) {

        return service.update(id, dto);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }


    @GetMapping("/pdf")
    public ResponseEntity<byte[]> exportPdf()
            throws Exception {

        System.out.println("PDF CHAMADO TESTE LOCAL");

        DashboardDTO dashboard =
                dashboardService.getDashboard();


        byte[] pdf =
                pdfService.generatePdf(
                        dashboard,
                        service.findAll(),
                        vendorService.findAll()

                );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=Resumo_Casamento.pdf")
                .contentType(
                        MediaType.APPLICATION_PDF)
                .body(pdf);

    }

}