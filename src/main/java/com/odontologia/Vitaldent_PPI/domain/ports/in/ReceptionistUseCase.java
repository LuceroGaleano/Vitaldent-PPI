package com.odontologia.Vitaldent_PPI.domain.ports.in;

import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.models.User;

public interface ReceptionistUseCase{
    void createAppoitment(Appointment appointment) throws BusinessException;

    void createPatient(Patient patient) throws BusinessException;

    void createUser(User user) throws BusinessException;

    void createPay(Pay pay) throws BusinessException;

    void deleteUser(String document) throws BusinessException;

    void scheduleAppointment(UUID idAppointment, String patientDocument) throws BusinessException;
    
    Appointment findAppointmentById(UUID id) throws NotFoundException;
    List<Appointment> findAppointmentByPatient(String patientDocument) throws NotFoundException;

    ClinicalRecord findRecordById(UUID id) throws NotFoundException;
    ClinicalRecord findRecordByAppointmentID(UUID idAppointment) throws NotFoundException;
    List<ClinicalRecord> findRecordByPatientDocument(String documentPatient) throws NotFoundException;

    Invoice findInvoiceById(UUID id) throws NotFoundException;
    Invoice findInvoiceByClinicalRecordId(UUID idClinicalRecord) throws NotFoundException;
    List<Invoice> findInvoiceByPatientId(UUID idPatient) throws NotFoundException;

    Patient findPatientByDocument(String document) throws NotFoundException;

    Pay findPayById(UUID id) throws NotFoundException;
    List<Pay> findPayByInvoiceId(UUID idInvoice) throws NotFoundException;

    User findUserByDocument(String document) throws NotFoundException;
    
    void cancelAppointment(UUID idAppointment, UUID relatedId) throws BusinessException;
    void closeAppointment(UUID idAppointment) throws BusinessException;
}