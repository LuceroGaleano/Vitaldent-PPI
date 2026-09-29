package com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Item;


public interface ItemPort {
    //find
    public Item findById(UUID id);

    //exists
    public boolean existsById(UUID id);

    //operation
    public void save(Item Item);
    public void update(Item Item);
}

