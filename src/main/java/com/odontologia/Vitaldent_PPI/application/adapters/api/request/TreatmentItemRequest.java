package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TreatmentItemRequest {
    @NotNull(message = "El insumo asociado es obligatorio")
    private UUID itemId;

    @NotNull(message = "La cantidad usada del insumo es obligatoria")
    @Positive(message = "La cantidad usada del insumo debe ser mayor que cero")
    private Integer quantityUsed;
}
