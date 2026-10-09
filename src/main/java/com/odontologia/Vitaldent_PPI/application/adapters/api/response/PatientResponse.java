package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.util.Date;
import java.util.UUID;

public record PatientResponse(
    UUID patientId,
    String fullName,
    String document,
    String phone,
    String email,
    String address,
    Date birthDate
) {}