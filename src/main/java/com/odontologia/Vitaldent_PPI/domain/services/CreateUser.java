package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class CreateUser{
    private final UserPort userPort;

    @Autowired 
    public CreateUser(UserPort userPort){
        this.userPort = userPort;
    }

    public void createUser(User user) throws BusinessException{
        //Validar que el usuaria exista
        if (user == null){
            throw new BusinessException("Usuario no encontrado");
        }

        //Validamos credenciales unicas del usuario
        if(userPort.existsById(user.getUserId())){
            throw  new BusinessException("Ya existe un usuario con el mismo ID");
        }

        if(userPort.existsByDocument(user.getDocument())){
            throw new BusinessException("Ya existe un usuario con el mismo documento");
        }

        if(userPort.existsByUserName(user.getUserName())){
            throw new BusinessException("Ya existe un usuario con el mismo nombre de usuario");
        }

        if(userPort.existsByEmail(user.getEmail())){
            throw new BusinessException("Ya existe un usuario con el mismo correo");
        }

        //Finalmente guardamos usuarios
        userPort.save(user);
    }
}