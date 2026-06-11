package com.wedding.wedding_backend.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.wedding.wedding_backend.dto.DashboardDTO;
import com.wedding.wedding_backend.entity.Expense;
import org.springframework.stereotype.Service;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfPCell;
import com.wedding.wedding_backend.entity.Vendor;


import java.io.ByteArrayOutputStream;
import java.util.List;
import java.text.NumberFormat;
import java.util.Locale;

@Service
public class PdfService {




        public byte[] generatePdf(
                DashboardDTO dashboard,
                List<Expense> expenses,
                List<Vendor> vendors

        ) throws Exception {

                ByteArrayOutputStream out = new ByteArrayOutputStream();

                Document document = new Document();
                NumberFormat currencyFormatter =
                        NumberFormat.getCurrencyInstance(
                                new Locale("pt", "BR")
                        );

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
                        currencyFormatter.format(
                                dashboard.getTargetBudget()
                        ));

                summaryTable.addCell("Valor Guardado");
                summaryTable.addCell(
                        currencyFormatter.format(
                                dashboard.getCurrentSavings()
                        ));

                summaryTable.addCell("Total Gasto");
                summaryTable.addCell(
                        currencyFormatter.format(
                                dashboard.getTotalExpenses()
                        ));

                summaryTable.addCell("Valor Restante");
                summaryTable.addCell(
                        currencyFormatter.format(
                                dashboard.getRemainingAmount()
                        ));

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
                        new Paragraph(" ")
                );

                document.add(
                        new Paragraph(
                                "FORNECEDORES",
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(" ")
                );
                PdfPTable vendorsTable =
                        new PdfPTable(5);

                vendorsTable.setWidthPercentage(100);

                vendorsTable.addCell("Fornecedor");
                vendorsTable.addCell("Categoria");
                vendorsTable.addCell("Total");
                vendorsTable.addCell("Pago");
                vendorsTable.addCell("Restante");

                double totalVendorPaid = 0;
                double totalVendorRemaining = 0;

                for (Vendor vendor : vendors) {

                        vendorsTable.addCell(
                                vendor.getName()
                        );

                        vendorsTable.addCell(
                                vendor.getCategory()
                        );

                        vendorsTable.addCell(
                                "R$ " + vendor.getTotalAmount()
                        );

                        vendorsTable.addCell(
                                "R$ " + vendor.getPaidAmount()
                        );

                        vendorsTable.addCell(
                                "R$ " + vendor.getRemainingAmount()
                        );

                        totalVendorRemaining +=
                                vendor.getRemainingAmount()
                                        .doubleValue();

                        totalVendorPaid +=
                                vendor.getPaidAmount()
                                        .doubleValue();
                }
                document.add(vendorsTable);

                document.add(
                        new Paragraph("-")
                );

                document.add(
                        new Paragraph(
                                "TOTAL DESPESAS EXTRAS: R$ "
                                        + total,
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(
                                "TOTAL FORNECEDORES: R$ "
                                        + totalVendorRemaining,
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(
                                "TOTAL FORNECEDORES PAGOS: R$ "
                                        + totalVendorPaid,
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(
                                "TOTAL GERAL: R$ "
                                        + (total + totalVendorPaid),
                                sectionFont
                        )
                );

                document.add(
                        new Paragraph(" "));

                document.add(
                        new Paragraph(
                                "Esse é seu Plano financeiro atual."));

                document.close();

                return out.toByteArray();
        }
}