package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Invoice;

public interface InvoicePort {
    //find
    public Invoice findById(UUID id);
    public Invoice findByClinicalRecordId(UUID idClinicalRecord);
    public List<Invoice> findByPatientId(UUID idPatient);

    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Invoice invoice);
    public void update(Invoice invoice);
}
