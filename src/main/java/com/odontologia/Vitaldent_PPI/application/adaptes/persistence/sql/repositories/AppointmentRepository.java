package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.AppointmentEntity;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, UUID> {
    List<AppointmentEntity> findByPatient_PatientId(UUID patientId);

    List<AppointmentEntity> findByDoctor_UserId(UUID doctorId);

    boolean existsByDoctor_UserIdAndDateAndHour(UUID doctorId, LocalDate date, LocalTime hour);

    boolean existsByPatient_PatientIdAndDateAndHour(UUID patientId, LocalDate date, LocalTime hour);
}
