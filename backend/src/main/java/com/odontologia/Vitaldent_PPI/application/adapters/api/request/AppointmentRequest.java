package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@FutureAppointmentDateTime
@Getter
@Setter
public class AppointmentRequest {

    @NotNull(message = "La fecha de la cita es obligatoria")
    private LocalDate date;

    @NotNull(message = "La hora de la cita es obligatoria")
    private LocalTime hour;

    private UUID patientId;

    @NotNull(message = "El doctor es obligatorio")
    private UUID doctorId;

    private AppointmentStatus appointmentStatus;
}