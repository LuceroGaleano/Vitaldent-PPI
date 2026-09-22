package com.odontologia.Vitaldent_PPI.domain.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Invoice {
    private UUID invoiceId;
    private LocalDate date;
    private BigDecimal subtotal;
    private BigDecimal total;
}
