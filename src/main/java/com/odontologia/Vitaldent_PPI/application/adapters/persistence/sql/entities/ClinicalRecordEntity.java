package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "clinical_records")
public class ClinicalRecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID clinicalRecordId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "reason_for_consultation")
    private String reasonForConsultation;

    @Column(name = "record")
    private String record;

    @Column(name = "diagnostic")
    private String diagnostic;

    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private AppointmentEntity appointment;

    @ManyToOne
    @JoinColumn(name = "treatment_id")
    private TreatmentEntity treatment;
}
