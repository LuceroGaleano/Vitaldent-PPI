package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities;

import java.util.Date;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;


@Getter 
@Setter 
@Entity
@Table(name = "Patients")
public class PatientEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID patientId = UUID.randomUUID();

    @Column (name = "full_name")
    private String fullName;

    @Column (name="document")
    private String document;

    @Column (name="phone")
    private String phone;

    @Column (name="email")
    private String email;

    @Column (name = "address")
    private String address;

    @Column (name = "birth_date")
    private Date birthDate;
}
