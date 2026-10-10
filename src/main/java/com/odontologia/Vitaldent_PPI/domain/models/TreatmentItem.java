package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TreatmentItem {
    private UUID treatmentItemId;
    private UUID treatmentId;
    private UUID itemId;
    private int quantityUsed; 
}