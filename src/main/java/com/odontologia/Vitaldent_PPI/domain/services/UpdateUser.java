package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class UpdateUser {
    private final UserPort userPort;

    @Autowired 
    public UpdateUser(UserPort userPort){
        this.userPort = userPort;
    }

    public void updateUser(User user) throws BusinessException{
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
        userPort.update(user);
    }
}