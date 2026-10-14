package com.odontologia.Vitaldent_PPI.domain.models;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Appointment {
    private UUID appointmentId;
    private LocalDate date;
    private LocalTime hour;
    private UUID patientId;
    private UUID doctorId;
    private AppointmentStatus appointmentStatus;
}
