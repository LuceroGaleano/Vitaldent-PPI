package  com.odontologia.Vitaldent_PPI.domain.ports;

import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Appointment;

public interface AppointmentPort{
    //find
    public Appointment findById(UUID appointmentId);
    //Buscar por paciente?

    //exist
    public boolean existsById(UUID id);

    //operation
    public void save(Appointment appointment);
    public void update(Appointment appointment);
}