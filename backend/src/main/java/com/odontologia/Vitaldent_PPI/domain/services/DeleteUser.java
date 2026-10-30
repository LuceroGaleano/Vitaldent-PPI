package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

import jakarta.transaction.Transactional;

@Service
public class DeleteUser {
    private final UserPort userPort;
    private final PatientPort patientPort;

    public DeleteUser(UserPort userPort, PatientPort patientPort){
        this.userPort = userPort;
        this.patientPort = patientPort;
    }

    @Transactional
    public void deleteUser(String document) throws BusinessException {
        User user = userPort.findByDocument(document);
        if(user == null){
            throw new BusinessException("Usuario no encontrado");
        }

        Patient patient = null;
        if(user.getRol().equals(RolUser.PATIENT)){
            patient = patientPort.findByDocument(document);
            if(patient == null){
                throw new BusinessException("Paciente no encontrado");
            }
        }

        userPort.deleteByDocument(document);
        if (patient != null) {
            patientPort.deleteByDocument(document);
        }
    }
}
