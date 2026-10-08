package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InventoryEntity;

public interface InventoryRepository extends JpaRepository<InventoryEntity, UUID> {
    InventoryEntity findFirstByOrderByUpdateDateDesc();
}
