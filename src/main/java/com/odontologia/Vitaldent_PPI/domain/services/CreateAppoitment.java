package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class CreateAppoitment {
    private final AppointmentPort appointmentPort;
    private final UserPort userPort;

    @Autowired 
    public CreateAppoitment(AppointmentPort appointmentPort,  UserPort userPort){
        this.appointmentPort = appointmentPort;
        this.userPort = userPort;
    }

    public void createAppoitment(Appointment appointment) throws BusinessException{
        if(appointment == null){
            throw new BusinessException("No se encuentra la cita");
        }

        User doctor = userPort.findByDocument(appointment.getDoctor().getDocument());
        if(doctor == null){
            throw new BusinessException("No existe el doctor");
        }

        if(doctor.getRol() != RolUser.DOCTOR){
            throw new BusinessException("El usuario no es un doctor");
        }

        if(appointment.getDate() == null || appointment.getHour() == null){
            throw new BusinessException("Es obligatorio la fecha y hora de la cita");
        }

        if (appointment.getDate().isBefore(LocalDate.now())) {
            throw new BusinessException("No se pueden crear horarios en fechas pasadas");
        }

        if (LocalDateTime.of(appointment.getDate(), appointment.getHour()).isBefore(LocalDateTime.now())) {
            throw new BusinessException("El doctor ya tiene un cita en ese horario");
        }

        appointment.setAppointmentStatus(AppointmentStatus.AVAILABLE);
        appointment.setDoctor(doctor);
        appointment.setPatient(null);
        appointmentPort.save(appointment);
    }   
}
