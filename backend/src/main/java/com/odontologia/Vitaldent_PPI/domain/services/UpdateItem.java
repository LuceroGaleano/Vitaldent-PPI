package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Inventory;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InventoryPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service 
public class UpdateItem {
    private final ItemPort itemPort;
    private final InventoryPort inventoryPort;

    public UpdateItem(ItemPort itemPort, InventoryPort inventoryPort){
        this.itemPort = itemPort;
        this.inventoryPort = inventoryPort;
    }

    public void updateItem(Item item) throws BusinessException{
        if(item == null){
            throw new BusinessException("No se tiene el item");
        }

        if(!itemPort.existsById(item.getItemId())){
            throw new BusinessException("No se ha encontrado el insumo");
        }

        if(item.getStock() < 0 ){
            throw new BusinessException("No puede tener stock negativo");
        }

        Inventory inventory = inventoryPort.findInventory();
        if(inventory == null){
            throw new BusinessException("El inventario principal no está configurado");
        }
        
        item.setInventoryId(inventory.getInventoryID());
        itemPort.update(item);
    }
}
