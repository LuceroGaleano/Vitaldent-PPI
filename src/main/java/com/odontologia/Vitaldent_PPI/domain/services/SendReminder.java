package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.Reminder;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.NotificationPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ReminderPort;

@Service
public class SendReminder {

    private final AppointmentPort appointmentPort;
    private final ReminderPort reminderPort;
    private final NotificationPort notificationPort;
    private final PatientPort patientPort;

    public SendReminder(
            AppointmentPort appointmentPort,
            ReminderPort reminderPort,
            NotificationPort notificationPort,
            PatientPort patientPort) {
        this.appointmentPort = appointmentPort;
        this.reminderPort = reminderPort;
        this.notificationPort = notificationPort;
        this.patientPort = patientPort;
    }

    public void sendReminder(UUID appointmentId, ReminderChannel channel) throws BusinessException {
        Appointment appointment = appointmentPort.findById(appointmentId);
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        if(appointment.getAppointmentStatus() != AppointmentStatus.SCHEDULED){
            throw new BusinessException("Solo se envia recordatorio a citas agendadas");
        }

        if (appointment.getPatientId() == null) {
            throw new BusinessException("La cita no tiene un paciente asociado");
        }

        Patient patient = patientPort.findById(appointment.getPatientId());
        if (patient == null) {
            throw new BusinessException("No se ha encontrado el paciente de la cita");
        }

        String message = "Recuerda tu cita el " + appointment.getDate() + "a las" + appointment.getHour();
        notificationPort.sendEmail(patient.getEmail(), "Recordatorio de cita", message);

        Reminder reminder = new Reminder();
        reminder.setAppointmentId(appointmentId);
        reminder.setDate(LocalDate.now());
        reminder.setChannel(channel);
        reminderPort.save(reminder);
    }
}