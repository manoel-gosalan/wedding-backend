package com.wedding.wedding_backend.controller;

import com.wedding.wedding_backend.dto.ExpenseDTO;
import com.wedding.wedding_backend.entity.Expense;
import com.wedding.wedding_backend.mapper.ExpenseMapper;
import com.wedding.wedding_backend.pdf.PdfService;
import com.wedding.wedding_backend.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    
    private final PdfService pdfService;
    private final ExpenseService service;

    

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
            PdfService pdfService) {
        this.service = service;
        this.pdfService = pdfService;
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
        System.out.println("PDF CHAMADO");
        byte[] pdf = pdfService.generatePdf(
                service.findAll());

        final MediaType application_PDF2 = MediaType.APPLICATION_PDF;
            return ResponseEntity.ok()

                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=Resumo_Casamento.pdf")

                    .contentType(
                            application_PDF2)

                    .body(pdf);
        
    }

}