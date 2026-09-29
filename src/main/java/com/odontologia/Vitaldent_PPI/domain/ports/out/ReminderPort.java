package com.odontologia.Vitaldent_PPI.domain.ports.out;

import com.odontologia.Vitaldent_PPI.domain.models.Reminder;

public interface ReminderPort {
    //operation
    public void save(Reminder reminder);
}
