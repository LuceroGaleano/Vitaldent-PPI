package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class FindClinicalRecord {
    private final ClinicalRecordPort clinicalRecordPort;

    public FindClinicalRecord(ClinicalRecordPort clinicalRecordPort, UserPort userPort){
        this.clinicalRecordPort = clinicalRecordPort;
    }

    public ClinicalRecord findRecordById(UUID id) throws NotFoundException{
        ClinicalRecord clinicalRecord = clinicalRecordPort.findById(id);
        if(clinicalRecord == null){
            throw new NotFoundException("No se ha encontrado el historial medico");
        }
        return clinicalRecord;
    } 

    public ClinicalRecord findRecordByAppointmentID(UUID idAppointment) throws NotFoundException{
        ClinicalRecord clinicalRecord = clinicalRecordPort.findByAppointmentID(idAppointment);
        if(clinicalRecord == null){
            throw new NotFoundException("No se ha encontrado el historial medico");
        }
        return clinicalRecord;
    }   

    public List<ClinicalRecord> findRecordByDoctorDocument(String documentDoctor) throws NotFoundException, BusinessException {
        List<ClinicalRecord> records = clinicalRecordPort.findByDoctorDocument(documentDoctor);
        if (records == null || records.isEmpty()) {
            throw new NotFoundException("No se encontraron historiales médicos para este doctor");
        }
        return records;
    }

    public List<ClinicalRecord> findRecordByPatientDocument(String documentPatient) throws NotFoundException {
        List<ClinicalRecord> records = clinicalRecordPort.findByPatientDocument(documentPatient);
        if (records == null || records.isEmpty()) {
            throw new NotFoundException("No se encontraron historiales médicos para este paciente");
        }
        return records;
    }
}
