package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.UserRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.UserProfilePatchRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.AppointmentResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.UserResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.PatientUseCase;
import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
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

    //-User-------------------------------------------------------------------
    @PutMapping("/profile")
    public ResponseEntity<UserResponse> updateProfile(@Valid @RequestBody UserRequest request) {
        User authenticatedUser = getAuthenticatedUser();
        User user = toUser(request);
        user.setUserId(authenticatedUser.getUserId());
        user.setDocument(authenticatedUser.getDocument());
        user.setRol(authenticatedUser.getRol());
        user.setPatientId(authenticatedUser.getPatientId());
        patientUseCase.updateUser(user, authenticatedUser.getUserId());
        return ResponseEntity.ok(toUserResponse(user));
    }

    @PatchMapping("/profile")
    public ResponseEntity<UserResponse> patchProfile(@Valid @RequestBody UserProfilePatchRequest request) {
        User user = getAuthenticatedUser();
        if (request.getUserName() != null) user.setUserName(request.getUserName());
        if (request.getPassword() != null) user.setPassword(request.getPassword());
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAddress() != null) user.setAddress(request.getAddress());
        if (request.getBirthDate() != null) user.setBirthDate(request.getBirthDate());

        patientUseCase.updateUser(user, user.getUserId());
        return ResponseEntity.ok(toUserResponse(user));
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

    private User toUser(UserRequest request) {
        User user = new User();
        user.setUserName(request.getUserName());
        user.setPassword(request.getPassword());
        user.setFullName(request.getFullName());
        user.setDocument(request.getDocument());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setBirthDate(request.getBirthDate());
        user.setRol(request.getRol());
        user.setPatientId(request.getPatientId());
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

    private UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getUserId(), user.getUserName(), user.getFullName(), user.getDocument(),
                user.getEmail(), user.getPhone(), user.getAddress(), user.getBirthDate(),
                user.getRol(), user.getPatientId());
    }
}
