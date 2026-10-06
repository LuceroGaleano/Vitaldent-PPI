package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record InvoiceResponse(
    UUID invoiceId,
    LocalDate date,
    BigDecimal total,
    boolean isPaid,
    UUID clinicalRecordId
) {}