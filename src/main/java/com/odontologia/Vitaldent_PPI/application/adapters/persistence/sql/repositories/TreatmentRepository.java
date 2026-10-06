package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.TreatmentEntity;

public interface TreatmentRepository extends JpaRepository<TreatmentEntity, UUID> {
    boolean existsByNameIgnoreCase(String name);
}
