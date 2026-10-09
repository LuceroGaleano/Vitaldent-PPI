package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;

@Service
public class CloseAppointment {
    private final AppointmentPort apointmentPort;
    
    public CloseAppointment(AppointmentPort apointmentPort){
        this.apointmentPort = apointmentPort;
    }

    public void closeAppointment(UUID idAppointment) throws BusinessException{
        Appointment appointment = apointmentPort.findById(idAppointment);
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        if(appointment.getAppointmentStatus() == AppointmentStatus.CLOSED){
            throw new BusinessException("La cita ya esta cancelada");
        }

        appointment.setAppointmentStatus(AppointmentStatus.CLOSED);
        apointmentPort.update(appointment);
    }
}
