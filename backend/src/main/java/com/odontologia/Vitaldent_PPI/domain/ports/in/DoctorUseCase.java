package com.odontologia.Vitaldent_PPI.domain.ports.in;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;

public interface DoctorUseCase{
    void createClinicalRecord(ClinicalRecord record, UUID relatedUserId) throws BusinessException;

    void createTreatment(Treatment treatment) throws BusinessException;

    
    List<Appointment> findAppointmentByDoctor(String doctorDcoument) throws NotFoundException, BusinessException;
    
    List<ClinicalRecord> findRecordByDoctorDocument(String documentDoctor, UUID relatedId) throws NotFoundException, BusinessException;
    List<ClinicalRecord> findRecordByPatientDocument(String documentPatient) throws NotFoundException;

    Treatment findTreatmentById(UUID id) throws NotFoundException;
    List<Treatment> findTreatmentAll() throws NotFoundException;

    void updateTreatment(Treatment treatment) throws BusinessException;

}