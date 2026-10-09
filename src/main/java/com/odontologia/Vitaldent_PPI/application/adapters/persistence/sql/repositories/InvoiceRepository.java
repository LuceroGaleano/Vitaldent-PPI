package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InvoiceEntity;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, UUID> {
    InvoiceEntity findByClinicalRecord_ClinicalRecordId(UUID clinicalRecordId);

    List<InvoiceEntity> findByClinicalRecord_Appointment_Patient_PatientId(UUID patientId);
}
