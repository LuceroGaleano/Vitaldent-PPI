package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TreatmentRequest {
    private UUID treatmentId;

    @NotBlank(message = "El nombre del tratamiento es obligatorio")
    private String name;

    @NotBlank(message = "La descripción del tratamiento es obligatoria")
    private String description;

    @NotNull(message = "El costo del tratamiento es obligatorio")
    @Positive(message = "El costo del tratamiento debe ser mayor que cero")
    private BigDecimal cost;

    @Valid
    private List<TreatmentItemRequest> treatmentItems;
}