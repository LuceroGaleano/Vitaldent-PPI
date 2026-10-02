package com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.services.CancelAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.FindAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.ScheduleAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.UpdateUser;


@Service
public class PatientUseCase implements com.odontologia.Vitaldent_PPI.domain.ports.in.PatientUseCase{
    @Autowired
    private final FindAppointment findAppointment;

    @Autowired
    private final ScheduleAppointment scheduleAppointment;

    @Autowired
    private final CancelAppointment cancelAppointment;

    @Autowired 
    private final UpdateUser updateUser;

    public PatientUseCase(FindAppointment findAppointment,
        ScheduleAppointment scheduleAppointment,
        CancelAppointment cancelAppointment,
        UpdateUser updateUser
    ){
        this.findAppointment = findAppointment;
        this.scheduleAppointment = scheduleAppointment;
        this.cancelAppointment = cancelAppointment;
        this.updateUser = updateUser;
    }

    @Override
    public List<Appointment> findByPatient(String patientDocument) throws NotFoundException{
        return findAppointment.findByPatient(patientDocument);
    }

    @Override
    public void scheduleAppointment(UUID idAppointment) throws BusinessException{
        scheduleAppointment.scheduleAppointment(idAppointment);
    }

    @Override 
    public void cancelAppointment(UUID idAppointment, UUID relatedId) throws BusinessException{
        cancelAppointment.cancelAppointment(idAppointment, relatedId);
    }

    @Override 
    public void updateUser(User user, UUID relatedId) throws BusinessException{
        updateUser.updateUser(user, relatedId);
    }
}