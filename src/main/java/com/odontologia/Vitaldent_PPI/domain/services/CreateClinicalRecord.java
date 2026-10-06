package com.odontologia.Vitaldent_PPI.domain.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.ClinicalRecord;
import com.odontologia.Vitaldent_PPI.domain.models.Item;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.models.TreatmentItem;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.ports.out.AppointmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ClinicalRecordPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.TreatmentPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.UserPort;

@Service 
public class CreateClinicalRecord {
    private final ClinicalRecordPort clinicalRecordPort;
    private final AppointmentPort appointmentPort;
    private final UserPort userPort;
    private final TreatmentPort treatmentPort;
    private final ItemPort itemPort;
    private final CreateInvoice createInvoice;

    @Autowired 
    public CreateClinicalRecord(ClinicalRecordPort clinicalRecordPort, AppointmentPort appointmentPort, UserPort userPort, TreatmentPort treatmentPort, ItemPort itemPort, CreateInvoice createInvoice){
        this.clinicalRecordPort = clinicalRecordPort;
        this.appointmentPort = appointmentPort;
        this.userPort = userPort;
        this.treatmentPort = treatmentPort;
        this.itemPort = itemPort;
        this.createInvoice = createInvoice;
    }

    public void createClinicalRecord(ClinicalRecord record, UUID relatedUserId) throws BusinessException{
        if(record == null){
            throw new BusinessException("No se ha encontrado el historial");
        }

        if(relatedUserId == null){
            throw new BusinessException("El id del usuario esta vacio");
        }

        if (record.getAppointment() == null || record.getAppointment().getAppointmentId() == null) {
            throw new BusinessException("La cita asociada es obligatoria");
        }

        if (record.getTreatment() == null || record.getTreatment().getTreatamentId() == null) {
            throw new BusinessException("El tratamiento asociado es obligatorio");
        }

        Appointment appointment = appointmentPort.findById(record.getAppointment().getAppointmentId());
        if(appointment == null){
            throw new BusinessException("No se ha encontrado la cita");
        }

        Treatment treatment = treatmentPort.findById(record.getTreatment().getTreatamentId());
        if(treatment == null){
            throw new BusinessException("No se ha encontrado el tratamiento");
        }

        User doctor = userPort.findByDocument(appointment.getDoctor().getDocument());
        if(doctor == null){
            throw new BusinessException("No se ha encontrado el doctor");
        }

        if(!doctor.getUserId().equals(relatedUserId)){
            throw new BusinessException("Solo puede crear el historial el doctoe de la cita");
        }

        //Actualizar el stock de cada insumo
        List<TreatmentItem> treatmentItems = treatment.getTreatmentItems();
        if (treatmentItems != null && !treatmentItems.isEmpty()) {
            for (TreatmentItem treatmentItem : treatmentItems) {
                Item item = treatmentItem.getItem();
                int quantityUsed = treatmentItem.getQuantityUsed();

                if (item.getStock() < quantityUsed) {
                    throw new BusinessException("Stock insuficiente para el insumo: " + item.getName());
                }

                //Descontar sotck
                item.setStock(item.getStock() - quantityUsed);
                
                // Guardar stock
                itemPort.update(item);
            }
        }

        appointment.setAppointmentStatus(AppointmentStatus.COMPLETED);
        record.setDate(LocalDate.now());
        record.setAppointment(appointment);
        record.setTreatment(treatment);
        ClinicalRecord savedRecord = clinicalRecordPort.save(record);

        createInvoice.createInvoiceForClinicalRecord(savedRecord.getClinicalRecordId());

    }
}
