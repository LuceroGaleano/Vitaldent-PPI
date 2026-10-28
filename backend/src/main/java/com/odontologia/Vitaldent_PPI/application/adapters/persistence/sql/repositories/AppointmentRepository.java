package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.AppointmentEntity;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, UUID> {
    @Override
    @EntityGraph(attributePaths = {"patient", "doctor"})
    Optional<AppointmentEntity> findById(UUID appointmentId);

    @EntityGraph(attributePaths = {"patient", "doctor"})
    List<AppointmentEntity> findByPatient_PatientId(UUID patientId);

    @EntityGraph(attributePaths = {"patient", "doctor"})
    List<AppointmentEntity> findByDoctor_UserId(UUID doctorId);

    @EntityGraph(attributePaths = {"patient", "doctor"})
    List<AppointmentEntity> findByAppointmentStatus(AppointmentStatus appointmentStatus);

    boolean existsByDoctor_UserIdAndDateAndHour(UUID doctorId, LocalDate date, LocalTime hour);

    boolean existsByPatient_PatientIdAndDateAndHour(UUID patientId, LocalDate date, LocalTime hour);
}
