package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;

final class AppointmentEmailFormatter {
    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("EEEE, d 'de' MMMM 'de' yyyy", Locale.forLanguageTag("es-CO"));
    private static final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("hh:mm a", Locale.US);

    private AppointmentEmailFormatter() {
    }

    static String confirmation(Patient patient, Appointment appointment) {
        return format(patient, appointment, "Tu cita en Vitaldent ha sido confirmada.",
                "Te esperamos. Gracias por confiar en nosotros.");
    }

    static String cancellation(Patient patient, Appointment appointment) {
        return format(patient, appointment, "Tu cita en Vitaldent ha sido cancelada.",
                "Si deseas agendar una nueva cita, comunícate con nosotros.");
    }

    static String closed(Patient patient, Appointment appointment) {
        return format(patient, appointment, "Tu cita en Vitaldent ha sido cerrada.",
                "Gracias por confiar en nosotros.");
    }

    private static String format(Patient patient, Appointment appointment, String notice, String closing) {
        return "VITALDENT | NOTIFICACIÓN DE CITA\n\n"
                + "Hola, " + patient.getFullName() + "!\n\n"
                + notice + "\n\n"
                + "----------------------------------------\n"
                + "DETALLES DE TU CITA\n"
                + "Fecha: " + appointment.getDate().format(DATE_FORMAT) + "\n"
                + "Hora: " + appointment.getHour().format(TIME_FORMAT) + "\n"
                + "----------------------------------------\n\n"
                + closing + "\n\n"
                + "Equipo Vitaldent";
    }
}
