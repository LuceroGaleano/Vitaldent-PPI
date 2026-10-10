package com.odontologia.Vitaldent_PPI.application.usecases;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.services.CancelAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.CloseAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.CreateAppoitment;
import com.odontologia.Vitaldent_PPI.domain.services.CreatePatient;
import com.odontologia.Vitaldent_PPI.domain.services.CreatePay;
import com.odontologia.Vitaldent_PPI.domain.services.CreateUser;
import com.odontologia.Vitaldent_PPI.domain.services.DeleteUser;
import com.odontologia.Vitaldent_PPI.domain.services.FindAppointment;
import com.odontologia.Vitaldent_PPI.domain.services.FindClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.services.FindInvoice;
import com.odontologia.Vitaldent_PPI.domain.services.FindPatient;
import com.odontologia.Vitaldent_PPI.domain.services.FindPay;
import com.odontologia.Vitaldent_PPI.domain.services.FindUser;
import com.odontologia.Vitaldent_PPI.domain.services.ScheduleAppointment;

@Service
public class ReceptionistUseCase implements  com.odontologia.Vitaldent_PPI.domain.ports.in.ReceptionistUseCase{
    private final CreateAppoitment createAppoitment;

    private final CreatePatient createPatient;

    private final CreateUser createUser;

    private final CreatePay createPay;

    private final DeleteUser deleteUser;

    private final FindAppointment findAppointment;

    private final FindClinicalRecord findClinicalRecord;

    private final FindInvoice findInvoice;

    private final FindPatient findPatient;

    private final FindPay findPay;

    private final FindUser findUser;

    private final ScheduleAppointment scheduleAppointment;

    private final CancelAppointment cancelAppointment;

    private final CloseAppointment closeAppointment;

    public ReceptionistUseCase(CreateAppoitment createAppoitment,
        CreatePatient createPatient,
        CreateUser createUser,
        CreatePay createPay,
        DeleteUser deleteUser,
        FindAppointment findAppointment,
        FindClinicalRecord findClinicalRecord,
        FindInvoice findInvoice,
        FindPatient findPatient,
        FindPay findPay,
        FindUser findUser,
        ScheduleAppointment scheduleAppointment,
        CancelAppointment cancelAppointment,
        CloseAppointment closeAppointment
    ){
        this.createAppoitment = createAppoitment;
        this.createPatient = createPatient;
        this.createPay = createPay;
        this.deleteUser = deleteUser;
        this.findAppointment = findAppointment;
        this.findClinicalRecord = findClinicalRecord;
        this.findInvoice = findInvoice;
        this.findPatient = findPatient;
        this.findPay = findPay;
        this.findUser = findUser;
        this.scheduleAppointment = scheduleAppointment;
        this.cancelAppointment = cancelAppointment;
        this.closeAppointment = closeAppointment;
        this.createUser = createUser;
    }

    @Override
    public void createAppoitment(Appointment appointment) throws BusinessException{
        createAppoitment.createAppoitment(appointment);
    }

    @Override 
    public void createPatient(Patient patient) throws BusinessException{
        createPatient.createPatient(patient);
    }

    @Override
    @Override 
    public void createUser(User user) throws BusinessException{
        createUser.createUser(user);
    }

    @Override
    public void createPay(Pay pay) throws BusinessException{
        createPay.createPay(pay);
    }
    
    @Override 
    public void deleteUser(String document) throws BusinessException{
        deleteUser.deleteUser(document);
    }

    @Override 
    public Appointment findAppointmentById(UUID id) throws NotFoundException{
        return findAppointment.findAppointmentById(id);
    }

    @Override 
    public  List<Appointment> findAppointmentByPatient(String patientDocument) throws NotFoundException{
        return findAppointment.findAppointmentByPatient(patientDocument);
    }

    @Override 
    public ClinicalRecord findRecordById(UUID id) throws NotFoundException{
        return findClinicalRecord.findRecordById(id);
    }

    @Override 
    public ClinicalRecord findRecordByAppointmentID(UUID idAppointment) throws NotFoundException{
        return findClinicalRecord.findRecordByAppointmentID(idAppointment);
    }

    @Override
    public  List<ClinicalRecord> findRecordByPatientDocument(String documentPatient) throws NotFoundException{
        return findClinicalRecord.findRecordByPatientDocument(documentPatient);
    }

    @Override
    public Invoice findInvoiceById(UUID id) throws NotFoundException{
        return findInvoice.findInvoiceById(id);
    }

    @Override 
    public Invoice findInvoiceByClinicalRecordId(UUID idClinicalRecord) throws NotFoundException{
        return findInvoice.findInvoiceByClinicalRecordId(idClinicalRecord);
    }

    @Override 
    public List<Invoice> findInvoiceByPatientId(UUID idPatient) throws NotFoundException{
        return findInvoice.findInvoiceByPatientId(idPatient);
    }

    @Override 
    public Patient findPatientByDocument(String document) throws NotFoundException{
        return findPatient.findPatientByDocument(document);
    }

    @Override 
    public Pay findPayById(UUID id) throws NotFoundException{
        return findPay.findPayById(id);
    }

    @Override 
    public List<Pay> findPayByInvoiceId(UUID idInvoice) throws NotFoundException{
        return findPay.findPayByInvoiceId(idInvoice);
    }

    @Override  
    public User findUserByDocument(String document) throws NotFoundException{
        return findUser.findUserByDocument(document);
    }

    @Override
    public void scheduleAppointment(UUID idAppointment, String patientDocument) throws BusinessException{
        scheduleAppointment.scheduleAppointment(idAppointment, patientDocument);
    }

    @Override 
    public void cancelAppointment(UUID idAppointment, UUID relatedId) throws BusinessException{
        cancelAppointment.cancelAppointment(idAppointment, relatedId);
    }

    @Override 
    public void closeAppointment(UUID idAppointment) throws BusinessException{
        closeAppointment.closeAppointment(idAppointment);
    }
}