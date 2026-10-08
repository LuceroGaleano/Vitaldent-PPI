package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.ClinicalRecordEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InvoiceEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.ClinicalRecordRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.InvoiceRepository;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InvoicePort;

@Service
public class InvoicePersistenceAdapter implements InvoicePort {
    private final InvoiceRepository invoiceRepository;
    private final ClinicalRecordRepository clinicalRecordRepository;

    public InvoicePersistenceAdapter(
        InvoiceRepository invoiceRepository,
        ClinicalRecordRepository clinicalRecordRepository
    ) {
        this.invoiceRepository = invoiceRepository;
        this.clinicalRecordRepository = clinicalRecordRepository;
    }

    @Override
    public Invoice findById(UUID id) {
        return toModel(invoiceRepository.findById(id).orElse(null));
    }

    @Override
    public Invoice findByClinicalRecordId(UUID clinicalRecordId) {
        return toModel(invoiceRepository.findByClinicalRecord_ClinicalRecordId(clinicalRecordId));
    }

    @Override
    public List<Invoice> findByPatientId(UUID patientId) {
        List<Invoice> invoices = new ArrayList<>();
        for (InvoiceEntity entity : invoiceRepository.findByClinicalRecord_Appointment_Patient_PatientId(patientId)) {
            invoices.add(toModel(entity));
        }
        return invoices;
    }

    @Override
    public boolean existsById(UUID id) {
        return invoiceRepository.existsById(id);
    }

    @Override
    public void save(Invoice invoice) {
        InvoiceEntity savedEntity = invoiceRepository.save(toEntity(invoice));
        invoice.setInvoiceId(savedEntity.getInvoiceId());
    }

    @Override
    public void update(Invoice invoice) {
        InvoiceEntity existingEntity = invoiceRepository.findById(invoice.getInvoiceId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setDate(invoice.getDate());
            existingEntity.setTotal(invoice.getTotal());
            existingEntity.setPaid(invoice.isPaid());
            if (invoice.getClinicalRecord() != null) {
                ClinicalRecordEntity clinicalRecordEntity = clinicalRecordRepository
                    .findById(invoice.getClinicalRecord().getClinicalRecordId()).orElse(null);
                existingEntity.setClinicalRecord(clinicalRecordEntity);
            }
            invoiceRepository.save(existingEntity);
        }
    }

    private Invoice toModel(InvoiceEntity entity) {
        if (entity == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setInvoiceId(entity.getInvoiceId());
        invoice.setDate(entity.getDate());
        invoice.setTotal(entity.getTotal());
        invoice.setPaid(entity.isPaid());
        invoice.setClinicalRecord(toClinicalRecordModel(entity.getClinicalRecord()));
        return invoice;
    }

    private ClinicalRecord toClinicalRecordModel(ClinicalRecordEntity entity) {
        if (entity == null) {
            return null;
        }
        ClinicalRecord clinicalRecord = new ClinicalRecord();
        clinicalRecord.setClinicalRecordId(entity.getClinicalRecordId());
        clinicalRecord.setDate(entity.getDate());
        clinicalRecord.setReasonForConsultation(entity.getReasonForConsultation());
        clinicalRecord.setRecord(entity.getRecord());
        clinicalRecord.setDiagnostic(entity.getDiagnostic());
        return clinicalRecord;
    }

    private InvoiceEntity toEntity(Invoice invoice) {
        InvoiceEntity entity = new InvoiceEntity();
        entity.setDate(invoice.getDate());
        entity.setTotal(invoice.getTotal());
        entity.setPaid(invoice.isPaid());
        if (invoice.getClinicalRecord() != null) {
            ClinicalRecordEntity clinicalRecordEntity = clinicalRecordRepository
                .findById(invoice.getClinicalRecord().getClinicalRecordId()).orElse(null);
            entity.setClinicalRecord(clinicalRecordEntity);
        }
        return entity;
    }
}
