package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

public record AvailableAppointmentResponse(
    UUID appointmentId,
    LocalDate date,
    LocalTime hour,
    String doctorName,
    AppointmentStatus appointmentStatus
) {}
