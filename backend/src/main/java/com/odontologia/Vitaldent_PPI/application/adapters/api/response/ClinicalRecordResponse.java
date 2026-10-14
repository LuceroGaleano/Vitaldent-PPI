package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.time.LocalDate;
import java.util.UUID;

public record ClinicalRecordResponse(
    UUID clinicalRecordId,
    LocalDate date,
    String reasonForConsultation,
    String record,
    String diagnostic,
    UUID appointmentId,
    UUID treatmentId
) {}