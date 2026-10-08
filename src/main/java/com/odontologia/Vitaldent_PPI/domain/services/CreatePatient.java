package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service 
public class CreatePatient {
    private final PatientPort patientPort;

    public CreatePatient(PatientPort patientPort){
        this.patientPort = patientPort;
    }

    public void createPatient(Patient patient) throws BusinessException{
        //Validamos que el paciente exista
        if(patient == null){
            throw new BusinessException("Paciente no puede ser nulo");
        }

        //Validamos credenciales de paciente
        if(patientPort.existsByDocument(patient.getDocument())){
            throw new BusinessException("Documento ya existente");
        }

        patientPort.save(patient);
    }
}
