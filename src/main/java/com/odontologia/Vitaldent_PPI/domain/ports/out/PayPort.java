package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Pay;

public interface PayPort {
    //find
    public Pay findById(UUID id);
    
    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Pay pay);
}
