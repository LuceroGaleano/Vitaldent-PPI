package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class UpdateClinicalRecord {
    private final ClinicalRecordPort clinicalRecordPort;
    private final UserPort userPort;

    @Autowired 
    public UpdateClinicalRecord(ClinicalRecordPort clinicalRecordPort, UserPort userPort){
        this.clinicalRecordPort = clinicalRecordPort;
        this.userPort = userPort;
    }

    public void updateClinicalRecord(ClinicalRecord record, UUID relatedUserId){
        ClinicalRecord clinicalRecord = clinicalRecordPort.findById(record.getClinicalRecordId());
        if(clinicalRecord == null){
            throw new BusinessException("No se ha encontrado el historial");
        }

        User doctor = userPort.findByDocument(record.getAppointment().getDoctor().getDocument());
        if(doctor == null){
            throw new BusinessException("Doctor no econtrado");
        }

        if(!doctor.getUserId().equals(relatedUserId)){
            throw new BusinessException("Solo se permite modificar el doctor de la cita");
        }

        record.setDate(clinicalRecord.getDate());
        record.setAppointment(clinicalRecord.getAppointment());
        clinicalRecordPort.update(record);
    }
}
