package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemPatchRequest {
    @Pattern(regexp = ".*\\S.*", message = "El nombre del insumo no puede estar vacío")
    private String name;

    @PositiveOrZero(message = "El stock no puede ser negativo")
    private Integer stock;

    private Boolean active;
}
