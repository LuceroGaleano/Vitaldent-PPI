package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service
public class FindAppointment{
    private final AppointmentPort appointmentPort;
    private final PatientPort patientPort;
    private final UserPort userPort;

    public FindAppointment(AppointmentPort appointmentPort, PatientPort patientPort, UserPort userPort){
        this.appointmentPort = appointmentPort;
        this.patientPort = patientPort;
        this.userPort = userPort;
    }

    public Appointment findAppointmentById(UUID id) throws NotFoundException{
        Appointment appointment = appointmentPort.findById(id);

        if(appointment == null){
            throw new NotFoundException("No existe la cita con esa id");
        }

        return appointment;
    }

    public List<Appointment> findAppointmentByPatient(String patientDocument) throws NotFoundException{
        Patient patient = patientPort.findByDocument(patientDocument);
        if(patient == null){
            throw new NotFoundException("No se ha encontrado el paciente");
        }
        return appointmentPort.findByPatient(patient);
    }

    public List<Appointment> findAppointmentByDoctor(String doctorDcoument) throws NotFoundException, BusinessException{
        User user = userPort.findByDocument(doctorDcoument);
        if(user == null){
            throw new NotFoundException("No se ha encontrado el docotor");
        }

        if(user.getRol() != RolUser.DOCTOR){
            throw new BusinessException("El usuario no es doctor");
        }

        return appointmentPort.findByDoctor(user);
    }
}
