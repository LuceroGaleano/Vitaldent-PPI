package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TreatmentPatchRequest {
    @Pattern(regexp = ".*\\S.*", message = "El nombre del tratamiento no puede estar vacío")
    private String name;

    @Pattern(regexp = ".*\\S.*", message = "La descripción no puede estar vacía")
    private String description;

    @Positive(message = "El costo del tratamiento debe ser mayor que cero")
    private BigDecimal cost;

    @Valid
    private List<TreatmentItemRequest> treatmentItems;
}
