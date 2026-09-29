package com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Patient;


public interface PatientPort {
    //find
    public Patient findById(UUID id);
    
    //exists
    public boolean existisById(UUID id);

    //operation
    public void save(Patient patient);
    public void update(Patient patient);
}
