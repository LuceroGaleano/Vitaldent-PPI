package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.util.Date;
import java.util.UUID;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

public record UserResponse(
    UUID userId,
    String userName,
    String fullName,
    String document,
    String email,
    String phone,
    String address,
    Date birthDate,
    RolUser rol,
    UUID patientId
) {}