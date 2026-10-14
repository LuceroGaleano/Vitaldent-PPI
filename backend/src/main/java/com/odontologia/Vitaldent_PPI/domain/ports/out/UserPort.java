package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.User;

public interface UserPort {
    //find
    public User findById(UUID id);
    public User findByDocument(String document);
    public User findByUserName(String userName);
    
    //exists
    public boolean existsById(UUID id);
    public boolean existsByDocument(String document);
    public boolean existsByUserName(String userName);
    public boolean existsByEmail(String email);
    public boolean existsByUserNameAndDocumentNot(String userName, String document);
    public boolean existsByEmailAndDocumentNot(String email, String document);

    //operation
    public void save(User user);
    public void update(User user);
    public void deleteByDocument(String document);
}
