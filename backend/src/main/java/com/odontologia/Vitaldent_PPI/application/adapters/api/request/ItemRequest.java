package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemRequest {

    @NotBlank(message = "El nombre del insumo es obligatorio")
    private String name;

    @NotNull(message = "La cantidad en inventario es obligatoria")
    private Integer stock;

    private Boolean active;

    private UUID inventoryId;
}