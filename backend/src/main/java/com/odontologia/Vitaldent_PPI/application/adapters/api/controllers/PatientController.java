package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import java.util.List;
import java.util.UUID;


import com.odontologia.Vitaldent_PPI.application.adapters.api.response.AvailableAppointmentResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.AppointmentResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.PatientUseCase;
import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController 
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {
    private final PatientUseCase patientUseCase;
    private final UserPort userPort;

    public PatientController(PatientUseCase patientUseCase, UserPort userPort) {
        this.patientUseCase = patientUseCase;
        this.userPort = userPort;
    }

    //-Appointment-------------------------------------------------------------------
    @GetMapping("/appointment")
    public ResponseEntity<List<AppointmentResponse>> findAppointmentsByPatient() {
        String document = getAuthenticatedUser().getDocument();
        List<AppointmentResponse> appointments = patientUseCase.findAppointmentByPatient(document).stream()
                .map(this::toAppointmentResponse)
                .toList();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/appointment/available")
    public ResponseEntity<List<AvailableAppointmentResponse>> findAvailableAppointments() {
        List<AvailableAppointmentResponse> appointments = patientUseCase.findByAvaible().stream()
                .map(this::toAvailableAppointmentResponse)
                .toList();
        return ResponseEntity.ok(appointments);
    }

    @PatchMapping("/appointment/{id}/schedule")
    public ResponseEntity<Void> scheduleAppointment(@PathVariable UUID id) {
        patientUseCase.scheduleAppointment(id, getAuthenticatedUser().getDocument());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/appointment/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable UUID id) {
        patientUseCase.cancelAppointment(id, getAuthenticatedUser().getUserId());
        return ResponseEntity.noContent().build();
    }


    // -Mappers-------------------------------------------------------------------
    private User getAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getDetails() instanceof String document)) {
            throw new BusinessException("No se pudo identificar al usuario autenticado");
        }
        User user = userPort.findByDocument(document);
        if (user == null) {
            throw new BusinessException("No se encontró al usuario autenticado");
        }
        return user;
    }

    private AppointmentResponse toAppointmentResponse(Appointment appointment) {
        return new AppointmentResponse(
                appointment.getAppointmentId(),
                appointment.getDate(),
                appointment.getHour(),
                appointment.getPatientId(),
                appointment.getDoctorId(),
                appointment.getAppointmentStatus());
    }

    private AvailableAppointmentResponse toAvailableAppointmentResponse(Appointment appointment) {
        return new AvailableAppointmentResponse(
                appointment.getAppointmentId(),
                appointment.getDate(),
                appointment.getHour(),
                appointment.getDoctorName(),
                appointment.getAppointmentStatus());
    }

}
