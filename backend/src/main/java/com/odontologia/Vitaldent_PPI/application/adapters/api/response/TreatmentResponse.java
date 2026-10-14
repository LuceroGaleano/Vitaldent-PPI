package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public record TreatmentResponse(
    UUID treatamentId,
    String name,
    String description,
    BigDecimal cost,
    List<TreatmentItemResponse> treatmentItems
) {}