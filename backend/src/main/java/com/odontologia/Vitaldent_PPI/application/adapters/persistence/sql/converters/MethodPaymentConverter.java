package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.converters;

import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class MethodPaymentConverter implements AttributeConverter<MethodPayment, String> {

    @Override
    public String convertToDatabaseColumn(MethodPayment methodPayment) {
        return methodPayment == null ? null : methodPayment.name();
    }

    @Override
    public MethodPayment convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        return switch (value.trim().toUpperCase()) {
            case "CARD", "TARJETA" -> MethodPayment.CARD;
            case "CASH", "EFECTIVO" -> MethodPayment.CASH;
            default -> throw new IllegalArgumentException("Método de pago desconocido: " + value);
        };
    }
}
