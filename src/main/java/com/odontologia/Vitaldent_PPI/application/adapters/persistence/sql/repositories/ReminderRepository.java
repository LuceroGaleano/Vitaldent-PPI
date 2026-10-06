package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ReminderEntity;

public interface ReminderRepository extends JpaRepository<ReminderEntity, UUID> {
    List<ReminderEntity> findByAppointmentId(UUID appointmentId);
}
