package com.odontologia.Vitaldent_PPI.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;

@Service 
public class InactiveItem {
    private final ItemPort itemPort;

    @Autowired 
    public InactiveItem(ItemPort itemPort){
        this.itemPort = itemPort;
    }

    public void inactiveItem(Item item) throws  BusinessException{
        if(item == null){
            throw new BusinessException("No se entregado el item");
        }

        if(!itemPort.existsById(item.getItemId())){
            throw new BusinessException("No se ha encontrado el item");
        }

        item.setActive(false);
        itemPort.update(item);
    }
}
