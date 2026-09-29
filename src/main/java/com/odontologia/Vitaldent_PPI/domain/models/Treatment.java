package com.odontologia.Vitaldent_PPI.domain.models;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Treatment {
    private UUID tratamentId;
    private String name;
    private String description;
    private BigDecimal cost;
    private List<TreatmentItem> treatmentItems;
}
