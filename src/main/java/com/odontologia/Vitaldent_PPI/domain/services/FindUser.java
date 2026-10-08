package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service
public class FindUser{
    private final UserPort userPort;

    public FindUser(UserPort userPort){
        this.userPort = userPort;
    }

    public User findUserById(UUID id) throws NotFoundException{
        User user = userPort.findById(id);
        
        if(user == null){
            throw new NotFoundException("No existe un usuario con ese id");
        }

        return user;
    }

    public User findUserByDocument(String document) throws NotFoundException{
        User user = userPort.findByDocument(document);

        if(user == null){
            throw new NotFoundException("No existe un usuario con ese documento");
        }

        return user;
    }
}
