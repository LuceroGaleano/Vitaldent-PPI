package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayRequest {
    @NotNull(message = "El monto del pago es obligatorio")
    @Positive(message = "El monto del pago debe ser mayor que cero")
    private BigDecimal amount;

    @PastOrPresent(message = "La fecha del pago no puede ser futura")
    private LocalDate date;

    @NotNull(message = "El método de pago es obligatorio")
    private MethodPayment methodPayment;

    @NotBlank(message = "El estado del pago es obligatorio")
    private String state;

    @NotNull(message = "La factura asociada es obligatoria")
    private UUID invoiceId;
}