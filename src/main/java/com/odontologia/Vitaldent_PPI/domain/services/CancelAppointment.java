package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service
public class CancelAppointment {
    private final AppointmentPort appointmentPort;
    private final UserPort userPort;

    @Autowired 
    public CancelAppointment(AppointmentPort appointmentPort, UserPort userPort){
        this.appointmentPort = appointmentPort;
        this.userPort = userPort;
    }

    public void cancelAppointment(Appointment appointment, UUID relatedId) throws BusinessException{
        if(appointment == null){
            throw new BusinessException("Cita no encontrada");
        }
        
        User relatedUser = userPort.findById(relatedId);
        if(relatedUser == null){
            throw new BusinessException("No se encuentra el usuario");
        }
        

        if(appointment.getAppointmentStatus() != AppointmentStatus.SCHEDULED){
            throw new BusinessException("Solo se puede cancelar citas agendadas");
        }

        if(relatedUser.getRol() == RolUser.PATIENT){
            if(!appointment.getPatient().getDocument().equals(relatedUser.getDocument())){
                throw new BusinessException("No puedes cancelar la cita de otro paciente");
            }
        }

        appointment.setPatient(null);
        appointment.setAppointmentStatus(AppointmentStatus.AVAILABLE);

        appointmentPort.update(appointment);
    }
}
