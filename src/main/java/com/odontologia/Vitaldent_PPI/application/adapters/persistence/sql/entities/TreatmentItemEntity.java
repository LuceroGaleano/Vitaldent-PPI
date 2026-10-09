package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities;

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
@Table(name = "treatment_items")
public class TreatmentItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID treatmentItemId;

    @ManyToOne
    @JoinColumn(name = "treatment_id")
    private TreatmentEntity treatment;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private ItemEntity item;

    @Column(name = "quantity_used")
    private int quantityUsed;
}
