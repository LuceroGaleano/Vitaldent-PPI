package com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;

public interface ClinicalRecordPort {
    //find
    public ClinicalRecord findById(UUID id);

    //exist
    public boolean existsById(UUID id);

    //operation
    public void save(ClinicalRecord clinicalRecord);
}
