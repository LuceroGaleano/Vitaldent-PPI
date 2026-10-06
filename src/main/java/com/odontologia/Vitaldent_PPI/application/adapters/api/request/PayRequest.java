package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.AssertTrue;
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

    @NotBlank(message = "El método de pago es obligatorio")
    private String methodPayment;

    @NotBlank(message = "El estado del pago es obligatorio")
    private String state;

    @NotNull(message = "La factura asociada es obligatoria")
    private InvoiceRequest invoice;

    @AssertTrue(message = "La factura debe incluir su identificador")
    public boolean isInvoiceIdentifierValid() {
        return invoice != null && invoice.getInvoiceId() != null;
    }
}