package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.NotificationPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service
public class CloseAppointment {
    private final AppointmentPort apointmentPort;
    private final PatientPort patientPort;
    private final NotificationPort notificationPort;
    
    public CloseAppointment(
            AppointmentPort apointmentPort,
            PatientPort patientPort,
            NotificationPort notificationPort) {
        this.apointmentPort = apointmentPort;
        this.patientPort = patientPort;
        this.notificationPort = notificationPort;
    }

    public void closeAppointment(UUID idAppointment) throws BusinessException{
        Appointment appointment = apointmentPort.findById(idAppointment);
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        if(appointment.getAppointmentStatus() == AppointmentStatus.CLOSED){
            throw new BusinessException("La cita ya esta cancelada");
        }

        Patient patient = appointment.getPatientId() == null
                ? null
                : patientPort.findById(appointment.getPatientId());

        appointment.setAppointmentStatus(AppointmentStatus.CLOSED);
        apointmentPort.update(appointment);
        if (patient != null && patient.getEmail() != null && !patient.getEmail().isBlank()) {
            notificationPort.sendEmail(
                    patient.getEmail(),
                    "Cita cerrada - Vitaldent",
                    AppointmentEmailFormatter.closed(patient, appointment));
        }
    }
}
