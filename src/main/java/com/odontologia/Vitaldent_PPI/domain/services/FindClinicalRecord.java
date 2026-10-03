package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class FindClinicalRecord {
    private final ClinicalRecordPort clinicalRecordPort;
    private final UserPort userPort;

    @Autowired 
    public FindClinicalRecord(ClinicalRecordPort clinicalRecordPort, UserPort userPort){
        this.clinicalRecordPort = clinicalRecordPort;
        this.userPort = userPort;
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

    public List<ClinicalRecord> findRecordByDoctorDocument(String documentDoctor, UUID relatedId) throws NotFoundException, BusinessException {
        List<ClinicalRecord> records = clinicalRecordPort.findByDoctorDocument(documentDoctor);
        if (records == null || records.isEmpty()) {
            throw new NotFoundException("No se encontraron historiales médicos para este doctor");
        }

        User relatedUser = userPort.findById(relatedId);
        if(relatedUser.getRol() == RolUser.DOCTOR){
            if(!relatedUser.getDocument().equals(documentDoctor)){
                throw new BusinessException("Solo puedes ver tus historias medicas");
            }
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
