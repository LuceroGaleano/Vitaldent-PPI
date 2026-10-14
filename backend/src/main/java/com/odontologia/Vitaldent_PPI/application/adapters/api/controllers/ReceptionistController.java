package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.AppointmentRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.PatientRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.PayRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.UserRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.AppointmentResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.ClinicalRecordResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.InvoiceResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.PatientResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.PayResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.UserResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.ReceptionistUseCase;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/receptionist")
public class ReceptionistController {
    private final ReceptionistUseCase receptionistUseCase;

    public ReceptionistController(ReceptionistUseCase receptionistUseCase) {
        this.receptionistUseCase = receptionistUseCase;
    }

    

    //-Appointment-------------------------------------------------------------------
    @PostMapping("/appointment")
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest request) {
        Appointment appointment = toAppointment(request);
        receptionistUseCase.createAppoitment(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(toAppointmentResponse(appointment));
    }

    @GetMapping("/appointment/{id}")
    public ResponseEntity<AppointmentResponse> findAppointmentById(@PathVariable UUID id) {
        return ResponseEntity.ok(toAppointmentResponse(receptionistUseCase.findAppointmentById(id)));
    }

    @GetMapping("/appointment/patient/{document}")
    public ResponseEntity<List<AppointmentResponse>> findAppointmentsByPatient(@PathVariable String document) {
        return ResponseEntity.ok(receptionistUseCase.findAppointmentByPatient(document).stream()
                .map(this::toAppointmentResponse)
                .toList());
    }

    @PatchMapping("/appointment/{id}/{document}/schedule")
    public ResponseEntity<Void> scheduleAppointment(@PathVariable UUID id, @PathVariable String document) {
        receptionistUseCase.scheduleAppointment(id, document);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/appointment/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(@PathVariable UUID id) {
        receptionistUseCase.cancelAppointment(id, getAuthenticatedUser().getUserId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/appointment/{id}/close")
    public ResponseEntity<Void> closeAppointment(@PathVariable UUID id) {
        receptionistUseCase.closeAppointment(id);
        return ResponseEntity.noContent().build();
    }

    //-Patient-------------------------------------------------------------------
    @PostMapping("/patient")
    public ResponseEntity<PatientResponse> createPatient(@Valid @RequestBody PatientRequest request) {
        Patient patient = toPatient(request);
        receptionistUseCase.createPatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(toPatientResponse(patient));
    }

    @GetMapping("/patient/{document}")
    public ResponseEntity<PatientResponse> findPatientByDocument(@PathVariable String document) {
        return ResponseEntity.ok(toPatientResponse(receptionistUseCase.findPatientByDocument(document)));
    }

     //-user------------------------------------------------------------------

    @PostMapping("/user")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request) {
        User user = toUser(request);
        receptionistUseCase.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(toUserResponse(user));
    }

    @DeleteMapping("/user/{document}")
    public ResponseEntity<Void> deleteUser(@PathVariable String document) {
        receptionistUseCase.deleteUser(document);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{document}")
    public ResponseEntity<UserResponse> findUserByDocument(@PathVariable String document) {
        return ResponseEntity.ok(toUserResponse(receptionistUseCase.findUserByDocument(document)));
    }

    //-ClinicalRecord-------------------------------------------------------------------
    @GetMapping("/clinical_record/{id}")
    public ResponseEntity<ClinicalRecordResponse> findRecordById(@PathVariable UUID id) {
        return ResponseEntity.ok(toClinicalRecordResponse(receptionistUseCase.findRecordById(id)));
    }

    @GetMapping("/clinical_record/appointment/{appointmentId}")
    public ResponseEntity<ClinicalRecordResponse> findRecordByAppointmentId(@PathVariable UUID appointmentId) {
        return ResponseEntity.ok(toClinicalRecordResponse(
                receptionistUseCase.findRecordByAppointmentID(appointmentId)));
    }

    @GetMapping("/clinical_record/patient/{document}")
    public ResponseEntity<List<ClinicalRecordResponse>> findRecordsByPatient(@PathVariable String document) {
        return ResponseEntity.ok(receptionistUseCase.findRecordByPatientDocument(document).stream()
                .map(this::toClinicalRecordResponse)
                .toList());
    }

    //-Invoice-------------------------------------------------------------------
    @GetMapping("/invoice/{id}")
    public ResponseEntity<InvoiceResponse> findInvoiceById(@PathVariable UUID id) {
        return ResponseEntity.ok(toInvoiceResponse(receptionistUseCase.findInvoiceById(id)));
    }

    @GetMapping("/invoice/clinical_record/{clinicalRecordId}")
    public ResponseEntity<InvoiceResponse> findInvoiceByClinicalRecordId(@PathVariable UUID clinicalRecordId) {
        return ResponseEntity.ok(toInvoiceResponse(
                receptionistUseCase.findInvoiceByClinicalRecordId(clinicalRecordId)));
    }

    @GetMapping("/invoice/patient/{patientId}")
    public ResponseEntity<List<InvoiceResponse>> findInvoicesByPatientId(@PathVariable UUID patientId) {
        return ResponseEntity.ok(receptionistUseCase.findInvoiceByPatientId(patientId).stream()
                .map(this::toInvoiceResponse)
                .toList());
    }

    //-Pay-------------------------------------------------------------------
    @PostMapping("/pay")
    public ResponseEntity<PayResponse> createPay(@Valid @RequestBody PayRequest request) {
        Pay pay = toPay(request);
        receptionistUseCase.createPay(pay);
        return ResponseEntity.status(HttpStatus.CREATED).body(toPayResponse(pay));
    }

    @GetMapping("/pay/{id}")
    public ResponseEntity<PayResponse> findPayById(@PathVariable UUID id) {
        return ResponseEntity.ok(toPayResponse(receptionistUseCase.findPayById(id)));
    }

    @GetMapping("/pay/invoice/{invoiceId}")
    public ResponseEntity<List<PayResponse>> findPaysByInvoiceId(@PathVariable UUID invoiceId) {
        return ResponseEntity.ok(receptionistUseCase.findPayByInvoiceId(invoiceId).stream()
                .map(this::toPayResponse)
                .toList());
    }

    // -Mappers-------------------------------------------------------------------
    private User getAuthenticatedUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getDetails() instanceof String document)) {
            throw new BusinessException("No se pudo identificar al usuario autenticado");
        }
        User user = receptionistUseCase.findUserByDocument(document);
        if (user == null) {
            throw new BusinessException("No se encontró al usuario autenticado");
        }
        return user;
    }

    private Appointment toAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setDate(request.getDate());
        appointment.setHour(request.getHour());
        appointment.setDoctorId(request.getDoctorId());
        appointment.setPatientId(request.getPatientId());
        appointment.setAppointmentStatus(request.getAppointmentStatus());
        return appointment;
    }

    private Patient toPatient(PatientRequest request) {
        Patient patient = new Patient();
        patient.setFullName(request.getFullName());
        patient.setDocument(request.getDocument());
        patient.setPhone(request.getPhone());
        patient.setEmail(request.getEmail());
        patient.setAddress(request.getAddress());
        patient.setBirthDate(request.getBirthDate());
        return patient;
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

    private Pay toPay(PayRequest request) {
        Pay pay = new Pay();
        pay.setAmount(request.getAmount());
        pay.setDate(request.getDate());
        pay.setMethodPayment(request.getMethodPayment());
        pay.setState(request.getState());
        pay.setInvoiceId(request.getInvoiceId());
        return pay;
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

    private PatientResponse toPatientResponse(Patient patient) {
        return new PatientResponse(
                patient.getPatientId(), patient.getFullName(), patient.getDocument(),
                patient.getPhone(), patient.getEmail(), patient.getAddress(), patient.getBirthDate());
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(
                user.getUserId(), user.getUserName(), user.getFullName(), user.getDocument(),
                user.getEmail(), user.getPhone(), user.getAddress(), user.getBirthDate(),
                user.getRol(), user.getPatientId());
    }

    private ClinicalRecordResponse toClinicalRecordResponse(ClinicalRecord record) {
        return new ClinicalRecordResponse(
                record.getClinicalRecordId(), record.getDate(), record.getReasonForConsultation(),
                record.getRecord(), record.getDiagnostic(),
                record.getAppointmentId(),
                record.getTreatmentId());
    }

    private InvoiceResponse toInvoiceResponse(Invoice invoice) {
        return new InvoiceResponse(
                invoice.getInvoiceId(), invoice.getDate(), invoice.getTotal(), invoice.isPaid(),
                invoice.getClinicalRecordId());
    }

    private PayResponse toPayResponse(Pay pay) {
        return new PayResponse(
                pay.getPayId(), pay.getAmount(), pay.getDate(), pay.getMethodPayment(), pay.getState(),
                pay.getInvoiceId());
    }
}
