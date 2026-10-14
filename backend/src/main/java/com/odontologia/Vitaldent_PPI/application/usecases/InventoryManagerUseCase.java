package com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.services.ActiveItem;
import com.odontologia.Vitaldent_PPI.domain.services.CreateItem;
import com.odontologia.Vitaldent_PPI.domain.services.FindItem;
import com.odontologia.Vitaldent_PPI.domain.services.InactiveItem;
import com.odontologia.Vitaldent_PPI.domain.services.UpdateItem;

@Service
public class InventoryManagerUseCase implements  com.odontologia.Vitaldent_PPI.domain.ports.in.InventoryManagerUseCase{
    private final CreateItem createItem;

    private final FindItem findItem;

    private final ActiveItem activeItem;

    private final InactiveItem inactiveItem;

    private final UpdateItem updateItem;

    public InventoryManagerUseCase(CreateItem createItem,
        FindItem findItem,
        ActiveItem activeItem,
        InactiveItem inactiveItem,
        UpdateItem updateItem
    ){
        this.createItem = createItem;
        this.findItem = findItem;
        this.activeItem = activeItem;
        this.inactiveItem = inactiveItem;
        this.updateItem = updateItem;
    }

    @Override 
    public void createItem(Item item) throws BusinessException{
        createItem.createItem(item);
    }

    @Override 
    public Item findItemById(UUID id) throws NotFoundException{
        return findItem.findItemById(id);
    }

    @Override 
    public List<Item> findItemAll() throws NotFoundException{
        return findItem.findItemAll();
    }

    @Override 
    public void activeItem(UUID idItem) throws  BusinessException{
        activeItem.activeItem(idItem);
    }

    @Override
    public void inactiveItem(UUID idItem) throws  BusinessException{
        inactiveItem.inactiveItem(idItem);
    }

    @Override 
    public void updateItem(Item item) throws BusinessException{
        updateItem.updateItem(item);
    }
}