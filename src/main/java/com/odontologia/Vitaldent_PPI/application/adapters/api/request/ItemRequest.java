package com.odontologia.Vitaldent_PPI.application.adapters.api.request;


import jakarta.validation.Valid;
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

    @NotNull(message = "Debe indicar si el insumo está activo")
    private Boolean active;

    @Valid
    private InventoryRequest inventory;
}