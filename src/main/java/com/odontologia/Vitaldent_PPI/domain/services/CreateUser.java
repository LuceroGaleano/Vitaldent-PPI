package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PatientPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class CreateUser{
    private final UserPort userPort;
    private final PatientPort patientPort;

    public CreateUser(UserPort userPort, PatientPort patientPort){
        this.userPort = userPort;
        this.patientPort = patientPort;
    }

    public void createUser(User user) throws BusinessException{
        //Validar que el usuaria exista
        if (user == null){
            throw new BusinessException("Usuario no encontrado");
        }

        //Validamos credenciales unicas del usuario


        if(userPort.existsByDocument(user.getDocument())){
            throw new BusinessException("Ya existe un usuario con el mismo documento");
        }

        if(userPort.existsByUserName(user.getUserName())){
            throw new BusinessException("Ya existe un usuario con el mismo nombre de usuario");
        }

        if(userPort.existsByEmail(user.getEmail())){
            throw new BusinessException("Ya existe un usuario con el mismo correo");
        }

        if(user.getRol() == RolUser.PATIENT){
            Patient patient = patientPort.findByDocument(user.getDocument());
            if(patient == null){
                Patient newPatient = new Patient();
                newPatient.setFullName(user.getFullName());
                newPatient.setDocument(user.getDocument());
                newPatient.setPhone(user.getPhone());
                newPatient.setEmail(user.getEmail());
                newPatient.setAddress(user.getAddress());
                newPatient.setBirthDate(user.getBirthDate());

                patientPort.save(newPatient);
                Patient savedPatient = patientPort.findByDocument(user.getDocument());
                user.setPatientId(savedPatient.getPatientId());
            }else{
                user.setPatientId(patient.getPatientId());
            }
        }

        //Finalmente guardamos usuarios
        userPort.save(user);
    }
}