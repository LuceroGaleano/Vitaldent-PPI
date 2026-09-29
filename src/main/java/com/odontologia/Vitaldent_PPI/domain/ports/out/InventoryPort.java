package com.odontologia.Vitaldent_PPI.domain.ports.out;

import com.odontologia.Vitaldent_PPI.domain.models.Inventory;

public interface InventoryPort {
    //find
    public Inventory findInventory();

    //operation
    public void save(Inventory inventory);
    public void update(Inventory inventory);
}
