package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

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
@Table(name = "payments")
public class PayEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID payId;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "method_payment")
    private String methodPayment;

    @Column(name = "state")
    private String state;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private InvoiceEntity invoice;
}
