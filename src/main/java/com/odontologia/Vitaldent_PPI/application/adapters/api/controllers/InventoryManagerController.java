package com.odontologia.Vitaldent_PPI.application.adapters.api.controllers;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.application.adapters.api.request.ItemRequest;
import com.odontologia.Vitaldent_PPI.application.adapters.api.response.ItemResponse;
import com.odontologia.Vitaldent_PPI.application.usecases.InventoryManagerUseCase;
import com.odontologia.Vitaldent_PPI.domain.models.Inventory;
import com.odontologia.Vitaldent_PPI.domain.models.Item;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory_manager")
public class InventoryManagerController {
    private final InventoryManagerUseCase inventoryManagerUseCase;

    public InventoryManagerController(InventoryManagerUseCase inventoryManagerUseCase) {
        this.inventoryManagerUseCase = inventoryManagerUseCase;
    }

    //-Item-------------------------------------------------------------------
    @PostMapping("/item")
    public ResponseEntity<ItemResponse> createItem(@Valid @RequestBody ItemRequest request) {
        Item item = toItem(request);
        inventoryManagerUseCase.createItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(toItemResponse(item));
    }

    @GetMapping("/item/{id}")
    public ResponseEntity<ItemResponse> findItemById(@PathVariable UUID id) {
        return ResponseEntity.ok(toItemResponse(inventoryManagerUseCase.findItemById(id)));
    }

    @GetMapping("/item")
    public ResponseEntity<List<ItemResponse>> findItemAll() {
        return ResponseEntity.ok(inventoryManagerUseCase.findItemAll().stream()
                .map(this::toItemResponse)
                .toList());
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<ItemResponse> updateItem(
            @PathVariable UUID id,
            @Valid @RequestBody ItemRequest request) {
        Item item = toItem(request);
        item.setItemId(id);
        inventoryManagerUseCase.updateItem(item);
        return ResponseEntity.ok(toItemResponse(item));
    }

    @PatchMapping("/item/{id}/activate")
    public ResponseEntity<Void> activateItem(@PathVariable UUID id) {
        inventoryManagerUseCase.activeItem(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/item/{id}/deactivate")
    public ResponseEntity<Void> deactivateItem(@PathVariable UUID id) {
        inventoryManagerUseCase.inactiveItem(id);
        return ResponseEntity.noContent().build();
    }

    // -Mappers-------------------------------------------------------------------
    private Item toItem(ItemRequest request) {
        Item item = new Item();
        item.setItemId(request.getItemId());
        item.setName(request.getName());
        item.setStock(request.getStock());
        item.setActive(request.getActive());
        if (request.getInventory() != null) {
            Inventory inventory = new Inventory();
            inventory.setInventoryID(request.getInventory().getInventoryID());
            inventory.setUpdateDate(request.getInventory().getUpdateDate());
            item.setInventory(inventory);
        }
        return item;
    }

    private ItemResponse toItemResponse(Item item) {
        return new ItemResponse(
                item.getItemId(),
                item.getName(),
                item.getStock(),
                item.isActive(),
                item.getInventory() == null ? null : item.getInventory().getInventoryID());
    }
}
