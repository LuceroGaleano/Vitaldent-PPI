package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ItemEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.TreatmentEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.TreatmentItemEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.ItemRepository;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.TreatmentRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.models.TreatmentItem;
import com.odontologia.Vitaldent_PPI.domain.ports.out.TreatmentPort;

@Service
public class TreatmentPersistenceAdapter implements TreatmentPort {
    private final TreatmentRepository treatmentRepository;
    private final ItemRepository itemRepository;

    public TreatmentPersistenceAdapter(TreatmentRepository treatmentRepository, ItemRepository itemRepository) {
        this.treatmentRepository = treatmentRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public Treatment findById(UUID id) {
        return toModel(treatmentRepository.findById(id).orElse(null));
    }

    @Override
    public List<Treatment> findAll() {
        List<Treatment> treatments = new ArrayList<>();
        for (TreatmentEntity entity : treatmentRepository.findAll()) {
            treatments.add(toModel(entity));
        }
        return treatments;
    }

    @Override
    public boolean existsById(UUID id) {
        return treatmentRepository.existsById(id);
    }

    @Override
    public void save(Treatment treatment) {
        TreatmentEntity savedEntity = treatmentRepository.save(toEntity(treatment));
        treatment.setTreatamentId(savedEntity.getTreatamentId());
    }

    @Override
    public void update(Treatment treatment) {
        TreatmentEntity existingEntity = treatmentRepository.findById(treatment.getTreatamentId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setName(treatment.getName());
            existingEntity.setDescription(treatment.getDescription());
            existingEntity.setCost(treatment.getCost());
            if (treatment.getTreatmentItems() != null) {
                existingEntity.setTreatmentItems(toTreatmentItemEntities(treatment.getTreatmentItems(), existingEntity));
            }
            treatmentRepository.save(existingEntity);
        }
    }

    private Treatment toModel(TreatmentEntity entity) {
        if (entity == null) {
            return null;
        }
        Treatment treatment = new Treatment();
        treatment.setTreatamentId(entity.getTreatamentId());
        treatment.setName(entity.getName());
        treatment.setDescription(entity.getDescription());
        treatment.setCost(entity.getCost());
        if (entity.getTreatmentItems() != null) {
            List<TreatmentItem> treatmentItems = new ArrayList<>();
            for (TreatmentItemEntity itemEntity : entity.getTreatmentItems()) {
                TreatmentItem treatmentItem = new TreatmentItem();
                treatmentItem.setTreatmentItemId(itemEntity.getTreatmentItemId());
                treatmentItem.setQuantityUsed(itemEntity.getQuantityUsed());
                treatmentItem.setItem(toItemModel(itemEntity.getItem()));
                treatmentItems.add(treatmentItem);
            }
            treatment.setTreatmentItems(treatmentItems);
        }
        return treatment;
    }

    private Item toItemModel(ItemEntity entity) {
        if (entity == null) {
            return null;
        }
        Item item = new Item();
        item.setItemId(entity.getItemId());
        item.setName(entity.getName());
        item.setStock(entity.getStock());
        item.setActive(entity.isActive());
        return item;
    }

    private TreatmentEntity toEntity(Treatment treatment) {
        TreatmentEntity entity = new TreatmentEntity();
        entity.setName(treatment.getName());
        entity.setDescription(treatment.getDescription());
        entity.setCost(treatment.getCost());
        if (treatment.getTreatmentItems() != null) {
            entity.setTreatmentItems(toTreatmentItemEntities(treatment.getTreatmentItems(), entity));
        }
        return entity;
    }

    private List<TreatmentItemEntity> toTreatmentItemEntities(
        List<TreatmentItem> treatmentItems,
        TreatmentEntity treatmentEntity
    ) {
        List<TreatmentItemEntity> entities = new ArrayList<>();
        for (TreatmentItem treatmentItem : treatmentItems) {
            TreatmentItemEntity entity = new TreatmentItemEntity();
            entity.setTreatment(treatmentEntity);
            entity.setQuantityUsed(treatmentItem.getQuantityUsed());
            if (treatmentItem.getItem() != null) {
                ItemEntity itemEntity = itemRepository
                    .findById(treatmentItem.getItem().getItemId()).orElse(null);
                entity.setItem(itemEntity);
            }
            entities.add(entity);
        }
        return entities;
    }
}
