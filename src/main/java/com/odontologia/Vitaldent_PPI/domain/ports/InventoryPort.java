package com.odontologia.Vitaldent_PPI.domain.ports;

import com.odontologia.Vitaldent_PPI.domain.models.Inventory;

public interface InventoryPort {
    //operation
    public void save(Inventory inventory);
    public void update(Inventory inventory);
}
