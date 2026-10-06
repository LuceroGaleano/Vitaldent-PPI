package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.AppointmentEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ClinicalRecordEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.TreatmentEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.AppointmentRepository;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.ClinicalRecordRepository;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.TreatmentRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;

@Service
public class ClinicalRecordPersistenceAdapter implements ClinicalRecordPort {
    private final ClinicalRecordRepository clinicalRecordRepository;
    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;

    public ClinicalRecordPersistenceAdapter(
        ClinicalRecordRepository clinicalRecordRepository,
        AppointmentRepository appointmentRepository,
        TreatmentRepository treatmentRepository
    ) {
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.appointmentRepository = appointmentRepository;
        this.treatmentRepository = treatmentRepository;
    }

    @Override
    public ClinicalRecord findById(UUID id) {
        return toModel(clinicalRecordRepository.findById(id).orElse(null));
    }

    @Override
    public ClinicalRecord findByAppointmentID(UUID appointmentId) {
        return toModel(clinicalRecordRepository.findByAppointment_AppointmentId(appointmentId));
    }

    @Override
    public List<ClinicalRecord> findByDoctorDocument(String doctorDocument) {
        return toModels(clinicalRecordRepository.findByAppointment_Doctor_Document(doctorDocument));
    }

    @Override
    public List<ClinicalRecord> findByPatientDocument(String patientDocument) {
        return toModels(clinicalRecordRepository.findByAppointment_Patient_Document(patientDocument));
    }

    @Override
    public boolean existsById(UUID id) {
        return clinicalRecordRepository.existsById(id);
    }

    @Override
    public ClinicalRecord save(ClinicalRecord clinicalRecord) {
        ClinicalRecordEntity savedEntity = clinicalRecordRepository.save(toEntity(clinicalRecord));
        clinicalRecord.setClinicalRecordId(savedEntity.getClinicalRecordId());
        return toModel(savedEntity);
    }

    @Override
    public void update(ClinicalRecord clinicalRecord) {
        ClinicalRecordEntity existingEntity =
            clinicalRecordRepository.findById(clinicalRecord.getClinicalRecordId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setDate(clinicalRecord.getDate());
            existingEntity.setReasonForConsultation(clinicalRecord.getReasonForConsultation());
            existingEntity.setRecord(clinicalRecord.getRecord());
            existingEntity.setDiagnostic(clinicalRecord.getDiagnostic());
            if (clinicalRecord.getAppointment() != null) {
                AppointmentEntity appointmentEntity = appointmentRepository
                    .findById(clinicalRecord.getAppointment().getAppointmentId()).orElse(null);
                existingEntity.setAppointment(appointmentEntity);
            }
            if (clinicalRecord.getTreatment() != null) {
                TreatmentEntity treatmentEntity = treatmentRepository
                    .findById(clinicalRecord.getTreatment().getTreatamentId()).orElse(null);
                existingEntity.setTreatment(treatmentEntity);
            }
            clinicalRecordRepository.save(existingEntity);
        }
    }

    private List<ClinicalRecord> toModels(List<ClinicalRecordEntity> entities) {
        List<ClinicalRecord> records = new ArrayList<>();
        for (ClinicalRecordEntity entity : entities) {
            records.add(toModel(entity));
        }
        return records;
    }

    private ClinicalRecord toModel(ClinicalRecordEntity entity) {
        if (entity == null) {
            return null;
        }
        ClinicalRecord clinicalRecord = new ClinicalRecord();
        clinicalRecord.setClinicalRecordId(entity.getClinicalRecordId());
        clinicalRecord.setDate(entity.getDate());
        clinicalRecord.setReasonForConsultation(entity.getReasonForConsultation());
        clinicalRecord.setRecord(entity.getRecord());
        clinicalRecord.setDiagnostic(entity.getDiagnostic());
        clinicalRecord.setAppointment(toAppointmentModel(entity.getAppointment()));
        clinicalRecord.setTreatment(toTreatmentModel(entity.getTreatment()));
        return clinicalRecord;
    }

    private Appointment toAppointmentModel(AppointmentEntity entity) {
        if (entity == null) {
            return null;
        }
        Appointment appointment = new Appointment();
        appointment.setAppointmentId(entity.getAppointmentId());
        appointment.setDate(entity.getDate());
        appointment.setHour(entity.getHour());
        appointment.setAppointmentStatus(entity.getAppointmentStatus());
        return appointment;
    }

    private Treatment toTreatmentModel(TreatmentEntity entity) {
        if (entity == null) {
            return null;
        }
        Treatment treatment = new Treatment();
        treatment.setTreatamentId(entity.getTreatamentId());
        treatment.setName(entity.getName());
        treatment.setDescription(entity.getDescription());
        treatment.setCost(entity.getCost());
        return treatment;
    }

    private ClinicalRecordEntity toEntity(ClinicalRecord clinicalRecord) {
        ClinicalRecordEntity entity = new ClinicalRecordEntity();
        entity.setDate(clinicalRecord.getDate());
        entity.setReasonForConsultation(clinicalRecord.getReasonForConsultation());
        entity.setRecord(clinicalRecord.getRecord());
        entity.setDiagnostic(clinicalRecord.getDiagnostic());
        if (clinicalRecord.getAppointment() != null) {
            AppointmentEntity appointmentEntity = appointmentRepository
                .findById(clinicalRecord.getAppointment().getAppointmentId()).orElse(null);
            entity.setAppointment(appointmentEntity);
        }
        if (clinicalRecord.getTreatment() != null) {
            TreatmentEntity treatmentEntity = treatmentRepository
                .findById(clinicalRecord.getTreatment().getTreatamentId()).orElse(null);
            entity.setTreatment(treatmentEntity);
        }
        return entity;
    }
}
