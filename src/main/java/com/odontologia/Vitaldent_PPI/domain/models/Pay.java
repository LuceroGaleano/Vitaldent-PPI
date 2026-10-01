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

public class Pay {
    private UUID payId;
    private BigDecimal amount;
    private LocalDate date;
    private String methodPayment;
    private String state;
    private Invoice invoice;
}
