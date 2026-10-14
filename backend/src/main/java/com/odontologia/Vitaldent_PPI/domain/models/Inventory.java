package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;
import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor


public class Inventory {
    private UUID inventoryID;
    private LocalDate updateDate;
}
