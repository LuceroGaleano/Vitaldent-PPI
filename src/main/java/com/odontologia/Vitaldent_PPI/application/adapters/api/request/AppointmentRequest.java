package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

import jakarta.validation.Valid;
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

    @Valid
    private PatientRequest patient;

    @NotNull(message = "El doctor es obligatorio")
    @Valid
    private UserRequest doctor;

    private AppointmentStatus appointmentStatus;
}