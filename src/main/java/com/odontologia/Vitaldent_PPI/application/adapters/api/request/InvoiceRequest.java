package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvoiceRequest {
    private UUID invoiceId;

    @NotNull(message = "La fecha de la factura es obligatoria")
    @PastOrPresent(message = "La fecha de la factura no puede ser futura")
    private LocalDate date;

    @NotNull(message = "El total de la factura es obligatorio")
    @Positive(message = "El total de la factura debe ser mayor que cero")
    private BigDecimal total;

    @NotNull(message = "Debe indicar si la factura está pagada")
    private Boolean isPaid;

    @NotNull(message = "La historia clínica asociada es obligatoria")
    @Valid
    private ClinicalRecordRequest clinicalRecord;
}