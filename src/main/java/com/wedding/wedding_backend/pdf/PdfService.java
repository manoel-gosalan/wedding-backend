package com.wedding.wedding_backend.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import com.wedding.wedding_backend.dto.DashboardDTO;
import com.wedding.wedding_backend.entity.Expense;
import org.springframework.stereotype.Service;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPCell;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {




        public byte[] generatePdf(
                DashboardDTO dashboard,
                List<Expense> expenses
        ) throws Exception {

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
                                "Wedding Planner",
                                titleFont));

                document.add(
                        new Paragraph(
                                "Relatório Financeiro"));
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

                PdfPTable summaryTable =
                        new PdfPTable(2);

                summaryTable.setWidthPercentage(100);

                summaryTable.addCell("Meta do Casamento");
                summaryTable.addCell(
                        "R$ " + dashboard.getTargetBudget());

                summaryTable.addCell("Valor Guardado");
                summaryTable.addCell(
                        "R$ " + dashboard.getCurrentSavings());

                summaryTable.addCell("Total Gasto");
                summaryTable.addCell(
                        "R$ " + dashboard.getTotalExpenses());

                summaryTable.addCell("Valor Restante");
                summaryTable.addCell(
                        "R$ " + dashboard.getRemainingAmount());

                summaryTable.addCell("Data do Casamento");
                summaryTable.addCell(
                        dashboard.getWeddingDate().toString());

                document.add(summaryTable);

                


                document.add(
                                new Paragraph(" "));

                document.add(
                                new Paragraph(
                                                "DESPESAS",
                                                sectionFont));

                document.add(
                                new Paragraph(" "));

                PdfPTable expensesTable =
                        new PdfPTable(4);

                expensesTable.setWidthPercentage(100);

                expensesTable.addCell("Descrição");
                expensesTable.addCell("Categoria");
                expensesTable.addCell("Valor");
                expensesTable.addCell("Data");

                for (Expense expense : expenses) {

                        expensesTable.addCell(
                                expense.getDescription());

                        expensesTable.addCell(
                                expense.getCategory());

                        expensesTable.addCell(
                                "R$ " + expense.getValue());

                        expensesTable.addCell(
                                expense.getExpenseDate().toString());
                }

                document.add(expensesTable);

                document.add(
                                new Paragraph(" "));

                document.add(
                                new Paragraph(
                                                "TOTAL GERAL: R$ "
                                                                + total,
                                                sectionFont));

                document.add(
                        new Paragraph(" "));

                document.add(
                        new Paragraph(
                                "Gerado automaticamente pelo Goslana"));

                document.close();

                return out.toByteArray();
        }
}