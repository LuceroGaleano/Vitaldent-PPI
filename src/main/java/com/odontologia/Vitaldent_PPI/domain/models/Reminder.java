package com.odontologia.Vitaldent_PPI.domain.models;

import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Reminder {
    private UUID reminderId;
    private UUID appointmentId;
    private LocalDate date;
    private ReminderChannel chanel;
}
