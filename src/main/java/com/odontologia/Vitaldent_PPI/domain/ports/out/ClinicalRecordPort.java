package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;

public interface ClinicalRecordPort {
    //find
    public ClinicalRecord findById(UUID id);
    public ClinicalRecord findByAppointmentID(UUID idAppoitment);

    //exist
    public boolean existsById(UUID id);

    //operation
    public ClinicalRecord save(ClinicalRecord clinicalRecord);
    public void update(ClinicalRecord clinicalRecord);
}
