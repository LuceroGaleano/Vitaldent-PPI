package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.AppointmentEntity;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, UUID> {
    List<AppointmentEntity> findByPatient_PatientId(UUID patientId);

    List<AppointmentEntity> findByDoctor_UserId(UUID doctorId);

    List<AppointmentEntity> findByAppointmentStatus(AppointmentStatus appointmentStatus);

    boolean existsByDoctor_UserIdAndDateAndHour(UUID doctorId, LocalDate date, LocalTime hour);

    boolean existsByPatient_PatientIdAndDateAndHour(UUID patientId, LocalDate date, LocalTime hour);
}
