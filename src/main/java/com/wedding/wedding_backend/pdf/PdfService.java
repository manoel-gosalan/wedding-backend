package com.wedding.wedding_backend.pdf;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import com.wedding.wedding_backend.entity.Expense;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

    public byte[] generatePdf(
            List<Expense> expenses
    ) throws Exception {

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        Document document =
                new Document();

        PdfWriter.getInstance(
                document,
                out
        );

        document.open();

        document.add(
                new Paragraph(
                        "Resumo do Casamento"
                )
        );

        document.add(
                new Paragraph(" ")
        );

        for (Expense expense : expenses) {

            document.add(
                    new Paragraph(
                            expense.getDescription()
                                    + " - "
                                    + expense.getCategory()
                                    + " - "
                                    + expense.getValue()
                    )
            );
        }

        document.close();

        return out.toByteArray();
    }
}