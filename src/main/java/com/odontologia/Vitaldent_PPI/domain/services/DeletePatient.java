package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service
public class DeletePatient {
    private final PatientPort patientPort;

    public DeletePatient(PatientPort patientPort){
        this.patientPort = patientPort;
    }

    public void deletePatient(String document) throws BusinessException{
        if(!patientPort.existsByDocument(document)){
            throw new BusinessException("Paciente no encontrado");
        }

        patientPort.deleteByDocument(document);
    }
}
