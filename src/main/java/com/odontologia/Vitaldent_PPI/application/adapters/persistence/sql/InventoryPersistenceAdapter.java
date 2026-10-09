package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InventoryEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.InventoryRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Inventory;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InventoryPort;

@Service
public class InventoryPersistenceAdapter implements InventoryPort {
    private final InventoryRepository inventoryRepository;

    public InventoryPersistenceAdapter(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public Inventory findInventory() {
        return toModel(inventoryRepository.findFirstByOrderByUpdateDateDesc());
    }

    @Override
    public void save(Inventory inventory) {
        InventoryEntity savedEntity = inventoryRepository.save(toEntity(inventory));
        inventory.setInventoryID(savedEntity.getInventoryID());
    }

    @Override
    public void update(Inventory inventory) {
        InventoryEntity existingEntity = inventoryRepository.findById(inventory.getInventoryID()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setUpdateDate(inventory.getUpdateDate());
            inventoryRepository.save(existingEntity);
        }
    }

    private Inventory toModel(InventoryEntity entity) {
        if (entity == null) {
            return null;
        }
        Inventory inventory = new Inventory();
        inventory.setInventoryID(entity.getInventoryID());
        inventory.setUpdateDate(entity.getUpdateDate());
        return inventory;
    }

    private InventoryEntity toEntity(Inventory inventory) {
        InventoryEntity entity = new InventoryEntity();
        entity.setUpdateDate(inventory.getUpdateDate());
        return entity;
    }
}
