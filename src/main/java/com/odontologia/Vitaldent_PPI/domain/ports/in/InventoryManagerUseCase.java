package com.odontologia.Vitaldent_PPI.domain.ports.in;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Item;

public interface InventoryManagerUseCase {
    void createItem(Item item) throws BusinessException;
    Item findItemById(UUID id) throws NotFoundException;
    List<Item> findItemAll() throws NotFoundException;
    void activeItem(UUID idItem) throws  BusinessException;
    void inactiveItem(UUID idItem) throws  BusinessException;
    void updateItem(Item item) throws BusinessException;
}
