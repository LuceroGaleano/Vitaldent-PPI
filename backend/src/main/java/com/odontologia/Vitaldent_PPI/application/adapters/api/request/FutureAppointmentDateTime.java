package com.odontologia.Vitaldent_PPI.application.adapters.api.request;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = FutureAppointmentDateTimeValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FutureAppointmentDateTime {
    String message() default "La fecha y hora de la cita deben ser futuras";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
