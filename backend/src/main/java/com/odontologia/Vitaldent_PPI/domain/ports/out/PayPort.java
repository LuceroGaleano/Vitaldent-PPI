package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Pay;

public interface PayPort {
    //find
    public Pay findById(UUID id);
    public List<Pay> findByInvoiceId(UUID idInovice);
    
    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Pay pay);
}
