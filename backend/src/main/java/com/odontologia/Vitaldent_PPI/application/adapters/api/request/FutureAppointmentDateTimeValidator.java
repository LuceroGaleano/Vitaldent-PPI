package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.time.LocalDateTime;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FutureAppointmentDateTimeValidator
        implements ConstraintValidator<FutureAppointmentDateTime, AppointmentRequest> {

    @Override
    public boolean isValid(AppointmentRequest request, ConstraintValidatorContext context) {
        if (request == null || request.getDate() == null || request.getHour() == null) {
            return true;
        }

        return LocalDateTime.of(request.getDate(), request.getHour()).isAfter(LocalDateTime.now());
    }
}
