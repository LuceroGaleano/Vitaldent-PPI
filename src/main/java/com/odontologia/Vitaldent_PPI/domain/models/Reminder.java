package com.odontologia.Vitaldent_PPI.domain.models;

import java.time.LocalDate;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class Reminder {
    private UUID reminderId;
    private LocalDate date;
    private ReminderChannel chanel;
}
