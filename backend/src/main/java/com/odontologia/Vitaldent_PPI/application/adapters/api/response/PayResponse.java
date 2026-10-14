package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record PayResponse(
    UUID payId,
    BigDecimal amount,
    LocalDate date,
    String methodPayment,
    String state,
    UUID invoiceId
) {}