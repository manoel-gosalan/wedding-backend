package com.wedding.wedding_backend.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import com.wedding.wedding_backend.entity.Expense;
import org.springframework.stereotype.Service;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPCell;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

        public byte[] generatePdf(
                        List<Expense> expenses) throws Exception {

                ByteArrayOutputStream out = new ByteArrayOutputStream();

                Document document = new Document();

                PdfWriter.getInstance(
                                document,
                                out);

                document.open();

                Font titleFont = FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                18);

                Font sectionFont = FontFactory.getFont(
                                FontFactory.HELVETICA_BOLD,
                                14);

                document.add(
                                new Paragraph(
                                                "RESUMO DO CASAMENTO",
                                                titleFont));

                document.add(
                                new Paragraph(" "));

                document.add(
                                new Paragraph(
                                                "Data de geração: "
                                                                + java.time.LocalDate.now()));

                document.add(
                                new Paragraph(" "));

                double total = 0;

                for (Expense expense : expenses) {

                        total += expense
                                        .getValue()
                                        .doubleValue();
                }

                double meta = 30000;

                double restante = meta - total;

                document.add(
                                new Paragraph(
                                                "Meta do Casamento: R$ "
                                                                + meta));

                document.add(
                                new Paragraph(
                                                "Total Gasto: R$ "
                                                                + total));

                document.add(
                                new Paragraph(
                                                "Valor Restante: R$ "
                                                                + restante));

                document.add(
                                new Paragraph(" "));

                document.add(
                                new Paragraph(
                                                "DESPESAS",
                                                sectionFont));

                document.add(
                                new Paragraph(" "));

                for (Expense expense : expenses) {

                        document.add(
                                        new Paragraph(
                                                        "Descrição: "
                                                                        + expense.getDescription()));

                        document.add(
                                        new Paragraph(
                                                        "Categoria: "
                                                                        + expense.getCategory()));

                        document.add(
                                        new Paragraph(
                                                        "Valor: R$ "
                                                                        + expense.getValue()));

                        document.add(
                                        new Paragraph(
                                                        "Data: "
                                                                        + expense.getExpenseDate()));

                        document.add(
                                        new Paragraph(
                                                        "--------------------------------"));
                }

                document.add(
                                new Paragraph(" "));

                document.add(
                                new Paragraph(
                                                "TOTAL GERAL: R$ "
                                                                + total,
                                                sectionFont));

                document.close();

                return out.toByteArray();
        }
}