package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClinicalRecordRequest {
    @PastOrPresent(message = "La fecha del historial clínico no puede ser futura")
    private LocalDate date;

    @NotBlank(message = "El motivo de consulta es obligatorio")
    private String reasonForConsultation;

    @NotBlank(message = "El registro clínico es obligatorio")
    private String record;

    @NotBlank(message = "El diagnóstico es obligatorio")
    private String diagnostic;

    @Valid
    @NotNull(message = "La cita es obligaotria")
    private AppointmentRequest appointment;

    @Valid
    @NotNull(message = "El tratamiento es obligatorio")
    private TreatmentRequest treatment;

    @AssertTrue(message = "La cita y el tratamiento deben incluir sus identificadores")
    public boolean isRelatedEntitiesValid() {
        return appointment != null
                && appointment.getAppointmentId() != null
                && treatment != null
                && treatment.getTreatmentId() != null;
    }
}