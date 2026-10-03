package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class UpdateUser {
    private final UserPort userPort;
    private final PatientPort patientPort;

    @Autowired 
    public UpdateUser(UserPort userPort, PatientPort patientPort){
        this.userPort = userPort;
        this.patientPort = patientPort;
    }

    public void updateUser(User user, UUID relatedId) throws BusinessException{
        //Validar que el usuario exista
        if(!userPort.existsByDocument(user.getDocument())){
            throw new BusinessException("No existe usuairo con ese documento");
        }
        
        //Validar credenciales 
        if(userPort.existsByEmailAndDocumentNot(user.getEmail(), user.getDocument())){
            throw new BusinessException("Correo ya existente");
        }

        if(userPort.existsByUserNameAndDocumentNot(user.getUserName(), user.getDocument())){
            throw new BusinessException("Nombre de usuario ya existente");
        }

        User relatedUser = userPort.findById(relatedId);
        if(relatedUser == null){
            throw new BusinessException("El usuario no esta autenticado");
        }

        if(user.getRol() != RolUser.RECEPTIONIST){
            if(!user.getDocument().equals(relatedUser.getDocument())){
                throw new BusinessException("No puedes actualizar otro usuario diferente al tuyo");
            }
        }

        if(user.getRol() == RolUser.PATIENT){
            Patient patient = patientPort.findByDocument(user.getDocument());
            if(patient == null){
                throw new BusinessException("No se encontró el registro de paciente asociado a este documento");
            }
            
            patient.setFullName(user.getFullName());
            patient.setPhone(user.getPhone());
            patient.setEmail(user.getEmail());
            patient.setAddress(user.getAddress());
            
            patientPort.update(patient);
            user.setPatientId(patient.getPatientId());
        }

        userPort.update(user);
    }
}