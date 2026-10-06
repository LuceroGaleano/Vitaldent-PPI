package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.util.UUID;

public record ItemResponse(
    UUID itemId,
    String name,
    int stock,
    boolean active,
    UUID inventoryId
) {}