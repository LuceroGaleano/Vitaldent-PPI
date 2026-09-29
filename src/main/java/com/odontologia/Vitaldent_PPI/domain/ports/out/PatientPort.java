package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Patient;


public interface PatientPort {
    //find
    public Patient findById(UUID id);
    public Patient findByDocument(String document);
    
    //exists
    public boolean existsById(UUID id);
    public boolean existsByDocument(String document);

    //operation
    public void save(Patient patient);
    public void update(Patient patient);
    public void deleteByDocument(String document);
}
