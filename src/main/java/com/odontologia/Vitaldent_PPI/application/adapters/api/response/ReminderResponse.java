package com.odontologia.Vitaldent_PPI.application.adapters.api.response;

import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;

public record ReminderResponse(
    UUID reminderId,
    UUID appointmentId,
    LocalDate date,
    ReminderChannel channel
) {}