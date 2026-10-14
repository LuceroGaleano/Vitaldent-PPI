package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InventoryRequest {

    @NotNull(message = "La fecha de actualización del inventario es obligatoria")
    @PastOrPresent(message = "La fecha de actualización no puede ser futura")
    private LocalDate updateDate;
}