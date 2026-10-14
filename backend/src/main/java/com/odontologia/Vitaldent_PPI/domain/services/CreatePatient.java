package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class CreatePatient {
    private final PatientPort patientPort;
    private final UserPort userPort;

    public CreatePatient(PatientPort patientPort, UserPort userPort){
        this.patientPort = patientPort;
        this.userPort = userPort;
    }

    public void createPatient(Patient patient) throws BusinessException{
        if(patient == null){
            throw new BusinessException("Paciente no puede ser nulo");
        }

        if(patientPort.existsByDocument(patient.getDocument())){
            throw new BusinessException("Documento ya existente");
        }

        if(userPort.existsByDocument(patient.getDocument())){
            throw new BusinessException("Ya existe un usuario con el mismo documento");
        }

        if(userPort.existsByEmail(patient.getEmail())){
            throw new BusinessException("Ya existe un usuario con el mismo correo");
        }

        patientPort.save(patient);
        Patient savedPatient = patientPort.findByDocument(patient.getDocument());

        User newUser = new User();
        newUser.setUserName(patient.getDocument());
        newUser.setPassword(patient.getDocument());
        newUser.setFullName(patient.getFullName());
        newUser.setDocument(patient.getDocument());
        newUser.setEmail(patient.getEmail());
        newUser.setPhone(patient.getPhone());
        newUser.setAddress(patient.getAddress());
        newUser.setBirthDate(patient.getBirthDate());
        newUser.setRol(RolUser.PATIENT);
        newUser.setPatientId(savedPatient.getPatientId());

        userPort.save(newUser);
    }
}