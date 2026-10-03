package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InvoicePort;

@Service 
public class FindInvoice {
    private final InvoicePort invoicePort;

    @Autowired 
    public FindInvoice (InvoicePort invoicePort){
        this.invoicePort = invoicePort;
    }

    public Invoice findInvoiceById(UUID id) throws NotFoundException{
        Invoice invoice = invoicePort.findById(id);
        if(invoice == null){
            throw new  NotFoundException("No se ha encontrado la factura");
        }
        return invoice;
    }

    public Invoice findInvoiceByClinicalRecordId(UUID idClinicalRecord) throws NotFoundException{
        Invoice invoice = invoicePort.findByClinicalRecordId(idClinicalRecord);
        if(invoice == null){
            throw new  NotFoundException("No se ha encontrado la factura");
        }
        return invoice;
    }

    public List<Invoice> findInvoiceByPatientId(UUID idPatient) throws NotFoundException{
        List<Invoice> invoices = invoicePort.findByPatientId(idPatient);
        if(invoices == null || invoices.isEmpty()){
            throw new NotFoundException("El paciente no tiene facturas registradas");
        }
        return invoices;
    }
}
