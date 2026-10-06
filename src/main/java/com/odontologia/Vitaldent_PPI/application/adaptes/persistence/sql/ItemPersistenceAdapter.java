package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.InventoryEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ItemEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.InventoryRepository;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.ItemRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Inventory;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service
public class ItemPersistenceAdapter implements ItemPort {
    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;

    public ItemPersistenceAdapter(ItemRepository itemRepository, InventoryRepository inventoryRepository) {
        this.itemRepository = itemRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public Item findById(UUID id) {
        return toModel(itemRepository.findById(id).orElse(null));
    }

    @Override
    public List<Item> findAll() {
        List<Item> items = new ArrayList<>();
        for (ItemEntity entity : itemRepository.findAll()) {
            items.add(toModel(entity));
        }
        return items;
    }

    @Override
    public boolean existsById(UUID id) {
        return itemRepository.existsById(id);
    }

    @Override
    public void save(Item item) {
        ItemEntity savedEntity = itemRepository.save(toEntity(item));
        item.setItemId(savedEntity.getItemId());
    }

    @Override
    public void update(Item item) {
        ItemEntity existingEntity = itemRepository.findById(item.getItemId()).orElse(null);
        if (existingEntity != null) {
            existingEntity.setName(item.getName());
            existingEntity.setStock(item.getStock());
            existingEntity.setActive(item.isActive());
            if (item.getInventory() != null) {
                InventoryEntity inventoryEntity = inventoryRepository
                    .findById(item.getInventory().getInventoryID()).orElse(null);
                existingEntity.setInventory(inventoryEntity);
            }
            itemRepository.save(existingEntity);
        }
    }

    private Item toModel(ItemEntity entity) {
        if (entity == null) {
            return null;
        }
        Item item = new Item();
        item.setItemId(entity.getItemId());
        item.setName(entity.getName());
        item.setStock(entity.getStock());
        item.setActive(entity.isActive());
        item.setInventory(toInventoryModel(entity.getInventory()));
        return item;
    }

    private Inventory toInventoryModel(InventoryEntity entity) {
        if (entity == null) {
            return null;
        }
        Inventory inventory = new Inventory();
        inventory.setInventoryID(entity.getInventoryID());
        inventory.setUpdateDate(entity.getUpdateDate());
        return inventory;
    }

    private ItemEntity toEntity(Item item) {
        ItemEntity entity = new ItemEntity();
        entity.setName(item.getName());
        entity.setStock(item.getStock());
        entity.setActive(item.isActive());
        if (item.getInventory() != null) {
            InventoryEntity inventoryEntity = inventoryRepository
                .findById(item.getInventory().getInventoryID()).orElse(null);
            entity.setInventory(inventoryEntity);
        }
        return entity;
    }
}
