package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service 
public class ActiveItem {
    private final ItemPort itemPort;

    @Autowired 
    public ActiveItem(ItemPort itemPort){
        this.itemPort = itemPort;
    }

    public void activeItem(UUID idItem) throws  BusinessException{
        Item item = itemPort.findById(idItem);
        if(item == null){
            throw new BusinessException("No se entregado el item");
        }

        if(!itemPort.existsById(item.getItemId())){
            throw new BusinessException("No se ha encontrado el item");
        }

        item.setActive(true);
        itemPort.update(item);
    }
}