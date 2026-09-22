package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;
import java.math.BigDecimal;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Pay {
    private UUID payId;
    private BigDecimal amount;
    private String methodPayment;
    private String state;
}
