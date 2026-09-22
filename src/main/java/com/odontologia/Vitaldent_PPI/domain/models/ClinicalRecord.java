package com.odontologia.Vitaldent_PPI.domain.models;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class ClinicalRecord {
    private UUID clinicalRecordId;
    private LocalDate date;
    private String reasonForConsultation;
    private String record;
    private String diagnostic;
}
