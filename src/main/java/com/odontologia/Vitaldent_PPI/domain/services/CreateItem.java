package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Inventory;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InventoryPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service 
public class CreateItem {
    private final ItemPort itemPort;
    private final InventoryPort inventoryPort;

    public CreateItem(ItemPort itemPort, InventoryPort inventoryPort){
        this.itemPort = itemPort;
        this.inventoryPort = inventoryPort;
    }

    public void createItem(Item item) throws BusinessException{
        if(item == null){
            throw new BusinessException("No se ha encontrado el item");
        }

        if(item.getStock() < 0){
            throw new BusinessException("No se puede tener stock negativo");
        }

        Inventory inventory = inventoryPort.findInventory();
        if(inventory == null){
            throw new BusinessException("El inventario principal no está configurado");
        }

        item.setActive(true);
        item.setInventoryId(inventory.getInventoryID());
        itemPort.save(item);
    }
}
