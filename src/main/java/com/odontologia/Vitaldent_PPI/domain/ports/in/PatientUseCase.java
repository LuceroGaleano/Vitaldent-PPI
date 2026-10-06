package com.odontologia.Vitaldent_PPI.domain.ports.in;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.User;

public interface PatientUseCase{
    List<Appointment> findAppointmentByPatient(String patientDocument) throws NotFoundException;
    void scheduleAppointment(UUID idAppointment, String patientDocument) throws BusinessException;
    void cancelAppointment(UUID idAppointment, UUID relatedId) throws BusinessException;
    void updateUser(User user, UUID relatedId) throws BusinessException;
}