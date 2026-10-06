package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReminderRequest {
    @NotNull(message = "La cita asociada es obligatoria")
    private UUID appointmentId;

    @PastOrPresent(message = "La fecha del recordatorio no puede ser futura")
    private LocalDate date;

    @NotNull(message = "El canal del recordatorio es obligatorio")
    private ReminderChannel channel;
}