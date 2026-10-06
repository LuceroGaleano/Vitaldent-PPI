package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Reminder;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.NotificationPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ReminderPort;

@Service
public class SendReminder {

    private final AppointmentPort appointmentPort;
    private final ReminderPort reminderPort;
    private final NotificationPort notificationPort;

    @Autowired
    public SendReminder(AppointmentPort appointmentPort, ReminderPort reminderPort, NotificationPort notificationPort) {
        this.appointmentPort = appointmentPort;
        this.reminderPort = reminderPort;
        this.notificationPort = notificationPort;
    }

    public void sendReminder(UUID appointmentId, ReminderChannel channel) throws BusinessException {
        Appointment appointment = appointmentPort.findById(appointmentId);
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        if(appointment.getAppointmentStatus() != AppointmentStatus.SCHEDULED){
            throw new BusinessException("Solo se envia recordatorio a citas agendadas");
        }

        String message = "Recuerda tu cita el " + appointment.getDate() + "a las" + appointment.getHour();
        notificationPort.sendEmail(appointment.getPatient().getEmail(), "Recordatorio de cita", message);

        Reminder reminder = new Reminder();
        reminder.setAppointmentId(appointmentId);
        reminder.setDate(LocalDate.now());
        reminder.setChanel(channel);
        reminderPort.save(reminder);
    }
}