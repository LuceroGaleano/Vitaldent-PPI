package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID>{
    UserEntity findByDocument(String document);

    boolean existsByDocument(String document);
    boolean existsByEmail(String email);
    boolean existsByUserNameAndDocumentNot(String userName, String document);
    boolean existsByEmailAndDocumentNot(String email, String document);
    boolean existsByUserName(String userName);

    void deleteByDocument(String document);
}

