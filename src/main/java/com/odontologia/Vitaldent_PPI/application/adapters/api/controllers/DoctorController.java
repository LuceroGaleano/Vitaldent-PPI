package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.ClinicalRecordRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.ItemRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.TreatmentRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.request.TreatmentItemRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.AppointmentResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.ClinicalRecordResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.TreatmentItemResponse;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.TreatmentResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.DoctorUseCase;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.models.TreatmentItem;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    private final DoctorUseCase doctorUseCase;
    private final UserPort userPort;

    public DoctorController(DoctorUseCase doctorUseCase, UserPort userPort){
        this.doctorUseCase = doctorUseCase;
        this.userPort = userPort;
    }

    private User getAuthenticatedUser() {
        String document = (String) SecurityContextHolder.getContext().getAuthentication().getDetails();
        return userPort.findByDocument(document);
    }

    //- ClinicalRecord-------------------------------------------------------------------
    @PostMapping("/clinical_record")
    public ResponseEntity<Void> createClinical(@Valid @RequestBody ClinicalRecordRequest request) {
        ClinicalRecord clinical = toClinical(request);
        doctorUseCase.createClinicalRecord(clinical, getAuthenticatedUser().getUserId()); 
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/clinical_record/doctor/{documentDoctor}")
    public ResponseEntity<List<ClinicalRecordResponse>> findRecordByDoctorDocument(
            @PathVariable String documentDoctor, 
            @RequestParam(required = false) UUID relatedId) {
        List<ClinicalRecord> records = doctorUseCase.findRecordByDoctorDocument(documentDoctor, relatedId);
        List<ClinicalRecordResponse> response = records.stream()
                .map(this::toClinicalRecordResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/clinical_record/patient/{documentPatient}")
    public ResponseEntity<List<ClinicalRecordResponse>> findRecordByPatientDocument(
            @PathVariable String documentPatient) {
        List<ClinicalRecord> records = doctorUseCase.findRecordByPatientDocument(documentPatient);
        List<ClinicalRecordResponse> response = records.stream()
                .map(this::toClinicalRecordResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    //-Treatment-------------------------------------------------------------------
    @PostMapping("/treatment")
    public ResponseEntity<TreatmentResponse> createTreatment(@Valid @RequestBody TreatmentRequest request){
        Treatment treatment = toTreatment(request);
        doctorUseCase.createTreatment(treatment);
        return ResponseEntity.status(HttpStatus.CREATED).body(toTreatmentResponse(treatment));
    }

    @GetMapping("/treatment/{id}")
    public ResponseEntity<TreatmentResponse> findTreatmentById(@PathVariable UUID id){
        Treatment treatment = doctorUseCase.findTreatmentById(id);
        return ResponseEntity.ok(toTreatmentResponse(treatment));
    }

    @GetMapping("/treatment")
    public ResponseEntity<List<TreatmentResponse>> findTreatmentAll(){
        List<TreatmentResponse> treatments = doctorUseCase.findTreatmentAll()
                .stream()
                .map(this::toTreatmentResponse)
                .toList();
        return ResponseEntity.ok(treatments);
    }

    @PutMapping("/treatment/{id}")
    public ResponseEntity<TreatmentResponse> updateTreatment(
            @PathVariable UUID id,
            @Valid @RequestBody TreatmentRequest request) {
        Treatment treatment = toTreatment(request);
            treatment.setTreatamentId(id);
        doctorUseCase.updateTreatment(treatment);
        return ResponseEntity.ok(toTreatmentResponse(treatment));
    }

    //-Appointment-------------------------------------------------------------------
    @GetMapping("/appointment/doctor/{documentDoctor}")
    public ResponseEntity<List<AppointmentResponse>> findAppointmentByDoctor(@PathVariable String documentDoctor){
        List<Appointment> appointments = doctorUseCase.findAppointmentByDoctor(documentDoctor);
        List<AppointmentResponse> response = appointments.stream()
                .map(this::toAppointmentResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    // -Mappers-------------------------------------------------------------------
    private ClinicalRecord toClinical(ClinicalRecordRequest req) {
        ClinicalRecord clinical = new ClinicalRecord();
        clinical.setDate(req.getDate());
        clinical.setReasonForConsultation(req.getReasonForConsultation());
        clinical.setRecord(req.getRecord());
        clinical.setDiagnostic(req.getDiagnostic());
        Appointment appointment = new Appointment();
        clinical.setAppointment(appointment);

        Treatment treatment = new Treatment();
        treatment.setTreatamentId(req.getTreatment().getTreatmentId());
        clinical.setTreatment(treatment);
        return clinical;
    }

    private ClinicalRecordResponse toClinicalRecordResponse(ClinicalRecord clinical){
        return new ClinicalRecordResponse(
            clinical.getClinicalRecordId(),
            clinical.getDate(),
            clinical.getReasonForConsultation(),
            clinical.getRecord(),
            clinical.getDiagnostic(),
            clinical.getAppointment() == null ? null : clinical.getAppointment().getAppointmentId(),
            clinical.getTreatment() == null ? null : clinical.getTreatment().getTreatamentId()
        );
    }

    private Treatment toTreatment(TreatmentRequest req){
        Treatment treatment = new Treatment();
        treatment.setName(req.getName());
        treatment.setDescription(req.getDescription());
        treatment.setCost(req.getCost());
        treatment.setTreatmentItems(req.getTreatmentItems() == null ? null : req.getTreatmentItems().stream()
                .map(this::toTreatmentItem)
                .toList());
        return treatment;
    }

    private TreatmentResponse toTreatmentResponse(Treatment treatment){
        return new TreatmentResponse(
            treatment.getTreatamentId(),
            treatment.getName(),
            treatment.getDescription(),
            treatment.getCost(),
            treatment.getTreatmentItems() == null ? null : treatment.getTreatmentItems().stream()
                    .map(this::toTreatmentItemResponse)
                    .toList()
        );
    }

    private AppointmentResponse toAppointmentResponse(Appointment appointment){
        return new AppointmentResponse(
            appointment.getAppointmentId(),
            appointment.getDate(),
            appointment.getHour(),
            appointment.getPatient() == null ? null : appointment.getPatient().getPatientId(),
            appointment.getDoctor() == null ? null : appointment.getDoctor().getUserId(),
            appointment.getAppointmentStatus()
        );
    }

    private TreatmentItem toTreatmentItem(TreatmentItemRequest request) {
        TreatmentItem treatmentItem = new TreatmentItem();
        treatmentItem.setQuantityUsed(request.getQuantityUsed());
        if (request.getItem() != null) {
            treatmentItem.setItem(toItem(request.getItem()));
        }
        return treatmentItem;
    }

    private Item toItem(ItemRequest request) {
        Item item = new Item();
        item.setName(request.getName());
        if (request.getStock() != null) {
            item.setStock(request.getStock());
        }
        if (request.getActive() != null) {
            item.setActive(request.getActive());
        }
        return item;
    }

    private TreatmentItemResponse toTreatmentItemResponse(TreatmentItem item) {
        return new TreatmentItemResponse(
                item.getTreatmentItemId(),
                item.getTreatment() == null ? null : item.getTreatment().getTreatamentId(),
                item.getItem() == null ? null : item.getItem().getItemId(),
                item.getQuantityUsed());
    }
}