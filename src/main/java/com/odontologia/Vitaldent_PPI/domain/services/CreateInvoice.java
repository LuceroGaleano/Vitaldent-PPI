package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired 
    public CreateInvoice(InvoicePort invoicePort, ClinicalRecordPort clinicalRecordPort, TreatmentPort treatmentPort){
        this.invoicePort = invoicePort;
        this.clinicalRecordPort = clinicalRecordPort;
        this.treatmentPort = treatmentPort;
    }

    public void createInvoice(Invoice invoice) throws BusinessException{
        if(invoice == null){
            throw new BusinessException("No se ha entregado la factura");
        }

        ClinicalRecord clinicalRecord = clinicalRecordPort.findById(invoice.getClinicalRecord().getClinicalRecordId());
        if(clinicalRecord == null){
            throw new BusinessException("No se ha encontrado la cita medica");
        }

        Treatment treatment = treatmentPort.findById(clinicalRecord.getTreatment().getTreatamentId());
        if(treatment == null){
            throw new BusinessException("Debe tener un tratamiento");
        }

        invoice.setTotal(treatment.getCost());
        invoice.setClinicalRecord(clinicalRecord);
        invoice.setDate(LocalDate.now());
        invoice.setPaid(false);

        invoicePort.save(invoice);
    }
}
