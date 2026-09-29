package com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Reminder;

public interface ReminderPort {
    //find
    public Reminder findById(UUID id);
    
    //exists
    public boolean existisById(UUID id);

    //operation
    public void save(Reminder reminder);
}
