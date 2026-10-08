package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PatientEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PatientRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service
public class PatientPersistenceAdapter implements PatientPort {
    private final PatientRepository patientRepository;

    public PatientPersistenceAdapter(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient findById(UUID id) {
        return toModel(patientRepository.findById(id).orElse(null));
    }

    @Override
    public Patient findByDocument(String document) {
        return toModel(patientRepository.findByDocument(document));
    }

    @Override
    public boolean existsById(UUID id) {
        return patientRepository.existsById(id);
    }

    @Override
    public boolean existsByDocument(String document) {
        return patientRepository.existsByDocument(document);
    }

    @Override
    public void save(Patient patient) {
        PatientEntity savedEntity = patientRepository.save(toEntity(patient));
        patient.setPatientId(savedEntity.getPatientId());
    }

    @Override
    public void update(Patient patient) {
        PatientEntity existingEntity = patientRepository.findById(patient.getPatientId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setFullName(patient.getFullName());
            existingEntity.setDocument(patient.getDocument());
            existingEntity.setPhone(patient.getPhone());
            existingEntity.setEmail(patient.getEmail());
            existingEntity.setAddress(patient.getAddress());
            existingEntity.setBirthDate(patient.getBirthDate());
            patientRepository.save(existingEntity);
        }
    }

    @Override
    public void deleteByDocument(String document) {
        patientRepository.deleteByDocument(document);
    }

    private Patient toModel(PatientEntity entity) {
        if (entity == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setPatientId(entity.getPatientId());
        patient.setFullName(entity.getFullName());
        patient.setDocument(entity.getDocument());
        patient.setPhone(entity.getPhone());
        patient.setEmail(entity.getEmail());
        patient.setAddress(entity.getAddress());
        patient.setBirthDate(entity.getBirthDate());
        return patient;
    }

    private PatientEntity toEntity(Patient patient) {
        PatientEntity entity = new PatientEntity();
        entity.setFullName(patient.getFullName());
        entity.setDocument(patient.getDocument());
        entity.setPhone(patient.getPhone());
        entity.setEmail(patient.getEmail());
        entity.setAddress(patient.getAddress());
        entity.setBirthDate(patient.getBirthDate());
        return entity;
    }
}
