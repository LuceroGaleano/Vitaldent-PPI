package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service 
public class FindItem {
    private final ItemPort itemPort;

    @Autowired 
    public FindItem(ItemPort itemPort){
        this.itemPort = itemPort;
    }

    public Item findItemById(UUID id) throws NotFoundException{
        Item item = itemPort.findById(id);
        if(item == null){
            throw new NotFoundException("No se ha encontrado el insumo");
        }
        return item;
    }

    public List<Item> findItemAll() throws NotFoundException{
        List<Item> items = itemPort.findAll();
        if(items.isEmpty()){
            throw new NotFoundException("No se encuentran insumos registrados");
        }
        return items;
    }
}
