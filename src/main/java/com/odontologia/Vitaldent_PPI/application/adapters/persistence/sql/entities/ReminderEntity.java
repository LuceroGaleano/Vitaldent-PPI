package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities;

import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "reminders")
public class ReminderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID reminderId;

    @Column(name = "appointment_id")
    private UUID appointmentId;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "chanel")
    private ReminderChannel chanel;
}
