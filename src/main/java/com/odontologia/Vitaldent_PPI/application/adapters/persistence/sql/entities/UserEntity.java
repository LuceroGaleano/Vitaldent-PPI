package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities;

import java.util.Date;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table (name="users") 
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column (name="user_name")
    private String userName;

    @Column (name="password")
    private String password;

    @Column (name="full_name")
    private String fullName;

    @Column (name="document")
    private String document;

    @Column (name="email")
    private String email;

    @Column (name="phone")
    private String phone; 

    @Column (name="address")
    private String address;

    @Column (name="birth_date")
    private Date birthDate;

    @Column (name="rol_user")
    private RolUser rol;

    @ManyToOne 
    @JoinColumn (name="patient_id")
    private PatientEntity patient;
}
