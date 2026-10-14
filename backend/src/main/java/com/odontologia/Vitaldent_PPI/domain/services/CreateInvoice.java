package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InvoicePort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.TreatmentPort;


@Service
public class CreateInvoice {
    private final InvoicePort invoicePort;
    private final ClinicalRecordPort clinicalRecordPort;
    private final TreatmentPort treatmentPort;

    public CreateInvoice(InvoicePort invoicePort, ClinicalRecordPort clinicalRecordPort, TreatmentPort treatmentPort){
        this.invoicePort = invoicePort;
        this.clinicalRecordPort = clinicalRecordPort;
        this.treatmentPort = treatmentPort;
    }

    public void createInvoiceForClinicalRecord(UUID idClinicalRecord) throws BusinessException{
        ClinicalRecord clinicalRecord = clinicalRecordPort.findById(idClinicalRecord);
        if(clinicalRecord == null){
            throw new BusinessException("No se ha entregado la historia clinica");
        }

        if(clinicalRecord.getTreatmentId() == null){
            throw new BusinessException("La historia clinica debe tener un tratamiento");
        }

        Treatment treatment = treatmentPort.findById(clinicalRecord.getTreatmentId());
        if(treatment == null){
            throw new BusinessException("Debe tener un tratamiento");
        }

        Invoice invoice = new Invoice();
        invoice.setTotal(treatment.getCost());
        invoice.setClinicalRecordId(clinicalRecord.getClinicalRecordId());
        invoice.setDate(LocalDate.now());
        invoice.setPaid(false);

        invoicePort.save(invoice);
    }
}
