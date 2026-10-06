package com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.entities.ReminderEntity;
import com.odontologia.Vitaldent_PPI.application.adaptes.persistence.sql.repositories.ReminderRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Reminder;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ReminderPort;

@Service
public class ReminderPersistenceAdapter implements ReminderPort {
    private final ReminderRepository reminderRepository;

    public ReminderPersistenceAdapter(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    @Override
    public void save(Reminder reminder) {
        ReminderEntity savedEntity = reminderRepository.save(toEntity(reminder));
        reminder.setReminderId(savedEntity.getReminderId());
    }

    private ReminderEntity toEntity(Reminder reminder) {
        ReminderEntity entity = new ReminderEntity();
        entity.setAppointmentId(reminder.getAppointmentId());
        entity.setDate(reminder.getDate());
        entity.setChanel(reminder.getChanel());
        return entity;
    }
}
