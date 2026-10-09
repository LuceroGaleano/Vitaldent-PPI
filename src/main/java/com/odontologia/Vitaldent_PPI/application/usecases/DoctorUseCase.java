package com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.services.CreateClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.services.CreateTreatment;
import com.odontologia.Vitaldent_PPI.domain.services.FindAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.FindClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.services.FindTreatment;
import com.odontologia.Vitaldent_PPI.domain.services.UpdateTreatment;

@Service 
public class DoctorUseCase implements com.odontologia.Vitaldent_PPI.domain.ports.in.DoctorUseCase{
    private final CreateClinicalRecord createClinicalRecord;

    private final CreateTreatment createTreatment;

    private final FindAppointment findAppointment;

    private final FindClinicalRecord findClinicalRecord;

    private final FindTreatment findTreatment;

    private final UpdateTreatment updateTreatment;

    public DoctorUseCase(CreateClinicalRecord createClinicalRecord,
        CreateTreatment createTreatment,
        FindAppointment findAppointment,
        FindClinicalRecord findClinicalRecord,
        FindTreatment findTreatment,
        UpdateTreatment updateTreatment
    ){
        this.createClinicalRecord = createClinicalRecord;
        this.createTreatment = createTreatment;
        this.findAppointment = findAppointment;
        this.findClinicalRecord = findClinicalRecord;
        this.findTreatment = findTreatment;
        this.updateTreatment = updateTreatment;
    }

    @Override 
    public void createClinicalRecord(ClinicalRecord record, UUID relatedUserId) throws BusinessException{
        createClinicalRecord.createClinicalRecord(record, relatedUserId);
    }

    @Override
    public void createTreatment(Treatment treatment) throws BusinessException{
        createTreatment.createTreatment(treatment);
    }

    @Override
    public List<Appointment> findAppointmentByDoctor(String doctorDcoument) throws NotFoundException, BusinessException{
        return findAppointment.findAppointmentByDoctor(doctorDcoument);
    }

    @Override
    public List<ClinicalRecord> findRecordByDoctorDocument(String documentDoctor, UUID relatedId) throws NotFoundException, BusinessException{
        return findClinicalRecord.findRecordByDoctorDocument(documentDoctor, relatedId);
    }

    @Override 
    public List<ClinicalRecord> findRecordByPatientDocument(String documentPatient) throws NotFoundException{
        return findClinicalRecord.findRecordByPatientDocument(documentPatient);
    }

    @Override
    public Treatment findTreatmentById(UUID id) throws NotFoundException{
        return findTreatment.findTreatmentById(id);
    }

    @Override 
    public List<Treatment> findTreatmentAll() throws NotFoundException{
        return findTreatment.findTreatmentAll();
    }

    @Override 
    public void updateTreatment(Treatment treatment) throws BusinessException{
        updateTreatment.updateTreatment(treatment);
    }
}