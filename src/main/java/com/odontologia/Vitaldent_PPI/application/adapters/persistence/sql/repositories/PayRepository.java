package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PayEntity;

public interface PayRepository extends JpaRepository<PayEntity, UUID> {
    List<PayEntity> findByInvoice_InvoiceId(UUID invoiceId);
}
