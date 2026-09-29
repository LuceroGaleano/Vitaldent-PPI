package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;

@Service 
public class UpdatePatient {
    private final PatientPort patientPort;

    @Autowired 
    public UpdatePatient(PatientPort patientPort){
        this.patientPort = patientPort;
    }

    public void updatePatient(Patient patient) throws BusinessException{
        if(!patientPort.existsByDocument(patient.getDocument())){
            throw new BusinessException("No existe el paciente");
        }

        patientPort.update(patient);
    }
}
