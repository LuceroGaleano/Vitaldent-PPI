package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;

public record PayResponse(
    UUID payId,
    BigDecimal amount,
    LocalDate date,
    MethodPayment methodPayment,
    String state,
    UUID invoiceId
) {}