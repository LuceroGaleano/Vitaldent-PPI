package com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.User;

public interface UserPort {
    //find
    public User findById(UUID id);
    
    //exists
    public boolean existisById(UUID id);

    //operation
    public void save(User user);
    public void update(User user);
}
