package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.Date;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor

public class User{
    private UUID userId;
    private String userName;
    private String password;
    private String fullName;
    private String document;
    private String email;
    private String phone; 
    private String address;
    private Date birthDate;
    private RolUser rol;
    private UUID patientId;
}