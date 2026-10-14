package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.time.LocalDate;
import java.util.UUID;

public record InventoryResponse(
    UUID inventoryID,
    LocalDate updateDate
) {}