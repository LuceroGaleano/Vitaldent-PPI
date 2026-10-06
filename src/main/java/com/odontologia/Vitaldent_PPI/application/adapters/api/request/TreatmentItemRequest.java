package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TreatmentItemRequest {
    @Valid
    private TreatmentRequest treatment;

    @NotNull(message = "El insumo asociado es obligatorio")
    @Valid
    private ItemRequest item;

    @NotNull(message = "La cantidad usada del insumo es obligatoria")
    @Positive(message = "La cantidad usada del insumo debe ser mayor que cero")
    private Integer quantityUsed;

    @AssertTrue(message = "El insumo debe incluir su identificador")
    public boolean isItemIdentifierValid() {
        return item != null && item.getItemId() != null;
    }
}
