package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service
public class FindPatient{
    private final PatientPort patientPort;

    public FindPatient(PatientPort patientPort){
        this.patientPort = patientPort;
    }

    public Patient findPatientById(UUID id) throws NotFoundException{
        Patient patient = patientPort.findById(id);

        if(patient == null){
            throw new NotFoundException("No existe un paciente con ese id");
        }

        return patient;
    }

    public Patient findPatientByDocument(String document) throws NotFoundException{
        Patient patient = patientPort.findByDocument(document);

        if(patient == null){
            throw new NotFoundException("No existe un paciente con ese documento");
        }

        return patient;
    }
}