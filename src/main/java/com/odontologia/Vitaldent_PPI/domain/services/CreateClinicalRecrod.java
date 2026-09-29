package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class CreateClinicalRecrod {
    private final ClinicalRecordPort clinicalRecordPort;
    private final AppointmentPort appointmentPort;
    private final UserPort userPort;

    @Autowired 
    public CreateClinicalRecrod(ClinicalRecordPort clinicalRecordPort, AppointmentPort appointmentPort, UserPort userPort){
        this.clinicalRecordPort = clinicalRecordPort;
        this.appointmentPort = appointmentPort;
        this.userPort = userPort;
    }

    public void createClinicalRecord(ClinicalRecord record, UUID relatedUserId) throws BusinessException{
        if(record == null){
            throw new BusinessException("No se ha encontrado el historial");
        }

        if(relatedUserId == null){
            throw new BusinessException("El id del usuario esta vacio");
        }

        Appointment appointment = appointmentPort.findById(record.getAppointment().getAppointmentId());
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        User doctor = userPort.findByDocument(appointment.getDoctor().getDocument());
        if(doctor == null){
            throw new BusinessException("No se ha encontrado el doctor");
        }

        if(!doctor.getUserId().equals(relatedUserId)){
            throw new BusinessException("Solo puede crear el historial el doctoe de la cita");
        }

        appointment.setAppointmentStatus(AppointmentStatus.COMPLETED);
        record.setDate(LocalDate.now());
        record.setAppointment(appointment);
        clinicalRecordPort.save(record);
    }
}
