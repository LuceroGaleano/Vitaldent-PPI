package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.util.UUID;

public record TreatmentItemResponse(
    UUID treatmentItemId,
    UUID treatmentId,
    UUID itemId,
    int quantityUsed
) {}
