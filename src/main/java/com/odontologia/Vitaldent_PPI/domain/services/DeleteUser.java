package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service
public class DeleteUser {
    private final UserPort userPort;

    public DeleteUser(UserPort userPort){
        this.userPort = userPort;
    }

    public void deleteUser(String document) throws BusinessException{
        //Validamos que el usuario exista
        if(!userPort.existsByDocument(document)){
            throw new BusinessException("Usuario no encontrado");
        }

        userPort.deleteByDocument(document);
    }
}
