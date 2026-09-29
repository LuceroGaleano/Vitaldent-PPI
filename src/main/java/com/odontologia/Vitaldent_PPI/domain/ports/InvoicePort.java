package com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Invoice;

public interface InvoicePort {
    //find
    public Invoice findById(UUID id);

    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Invoice invoice);
    public void update(Invoice invoice);
}
