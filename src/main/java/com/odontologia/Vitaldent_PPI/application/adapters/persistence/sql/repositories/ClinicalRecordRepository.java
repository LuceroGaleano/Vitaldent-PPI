package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ClinicalRecordEntity;

public interface ClinicalRecordRepository extends JpaRepository<ClinicalRecordEntity, UUID> {
    ClinicalRecordEntity findByAppointment_AppointmentId(UUID appointmentId);

    List<ClinicalRecordEntity> findByAppointment_Doctor_Document(String doctorDocument);

    List<ClinicalRecordEntity> findByAppointment_Patient_Document(String patientDocument);
}
