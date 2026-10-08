package com.odontologia.Vitaldent_PPI.infrastructure;

import java.sql.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.UserEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // ya hay usuarios, no crear nada
        }

        UserEntity user = new UserEntity();
        user.setUserName("recepcion");
        user.setPassword("123456");
        user.setFullName("Recepcionista Prueba");
        user.setDocument("1000000001");
        user.setEmail("recepcion@test.com");
        user.setPhone("3000000000");
        user.setAddress("Calle 1");
        user.setBirthDate(Date.valueOf("1990-01-01"));
        user.setRol(RolUser.RECEPTIONIST);

        userRepository.save(user);

    }
}