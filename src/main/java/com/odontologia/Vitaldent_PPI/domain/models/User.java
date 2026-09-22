package com.odontologia.Vitaldent_PPI.domain.models;

import java.util.UUID;

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
    private RolUser rol;
}