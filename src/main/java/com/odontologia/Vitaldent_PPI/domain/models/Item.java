package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Item {
    private UUID itemId;
    private String name;
    private int stock;
}
