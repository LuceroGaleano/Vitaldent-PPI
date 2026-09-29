package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Treatment;

public interface TreatmentPort {
    //find
    public Treatment findById(UUID id);
    
    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Treatment treatment);
    public void update(Treatment treatment);
}
