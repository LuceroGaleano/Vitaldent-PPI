package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PatientEntity;

public interface PatientRepository extends JpaRepository<PatientEntity, UUID> {
    PatientEntity findByDocument(String document);

    boolean existsByDocument(String document);

    void deleteByDocument(String document);
}
