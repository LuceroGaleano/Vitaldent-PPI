package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, UUID> {
    boolean existsByNameIgnoreCase(String name);
}
