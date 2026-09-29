package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;

@Service 
public class FindClinicalRecord {
    private final ClinicalRecordPort clinicalRecordPort;

    @Autowired 
    public FindClinicalRecord(ClinicalRecordPort clinicalRecordPort){
        this.clinicalRecordPort = clinicalRecordPort;
    }

    public ClinicalRecord findById(UUID id) throws NotFoundException{
        ClinicalRecord clinicalRecord = clinicalRecordPort.findById(id);
        if(clinicalRecord == null){
            throw new NotFoundException("No se ha encontrado el historial medico");
        }
        return clinicalRecord;
    } 

    public ClinicalRecord findByAppointmentID(UUID idAppointment) throws NotFoundException{
        ClinicalRecord clinicalRecord = clinicalRecordPort.findByAppointmentID(idAppointment);
        if(clinicalRecord == null){
            throw new NotFoundException("No se ha encontrado el historial medico");
        }
        return clinicalRecord;
    }   
}
