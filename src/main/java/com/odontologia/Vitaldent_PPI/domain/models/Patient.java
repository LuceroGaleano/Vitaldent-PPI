package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Patient {
    private UUID patientId;
    private String fullName;
    private String document;
    private String phone;
    private String email;
    private String addres;
}
