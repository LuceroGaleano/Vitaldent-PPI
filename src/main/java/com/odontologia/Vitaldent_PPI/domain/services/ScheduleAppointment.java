package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service
public class ScheduleAppointment {
    private final AppointmentPort appointmentPort;
    private final PatientPort patientPort;

    public ScheduleAppointment(AppointmentPort appointmentPort, PatientPort patientPort){
        this.appointmentPort = appointmentPort;
        this.patientPort = patientPort;
    }

    public void scheduleAppointment(UUID idAppointment, String patientDocument) throws BusinessException{
        Appointment appointment = appointmentPort.findById(idAppointment);
        if(appointment == null){
            throw new BusinessException("Cita no encontrada");
        }

        if (patientDocument == null || patientDocument.isBlank()) {
            throw new BusinessException("El documento del paciente es obligatorio");
        }

        Patient patient = patientPort.findByDocument(patientDocument);

        if(patient == null){
            throw new BusinessException("No se ha registrado el paciente");
        }

        if(appointment.getAppointmentStatus() != AppointmentStatus.AVAILABLE){
            throw new BusinessException("La cita no esta habilitada");
        }

        if(appointmentPort.existsByPatientAndDateAndHour(patient.getPatientId(), appointment.getDate(), appointment.getHour())){
            throw new BusinessException("El paciente ya tiene una cita en ese mismo horario");
        }

        appointment.setPatient(patient);
        appointment.setAppointmentStatus(AppointmentStatus.SCHEDULED);
        appointmentPort.update(appointment);
    }
}
