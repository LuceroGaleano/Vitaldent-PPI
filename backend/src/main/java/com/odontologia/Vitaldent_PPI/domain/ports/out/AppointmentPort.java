package  com.odontologia.Vitaldent_PPI.domain.ports.out;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import com.odontologia.Vitaldent_PPI.domain.models.Appointment;
import com.odontologia.Vitaldent_PPI.domain.models.Patient;
import com.odontologia.Vitaldent_PPI.domain.models.User;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;

public interface AppointmentPort{
    //find
    public Appointment findById(UUID appointmentId);
    public List<Appointment> findAll();
    public List<Appointment> findByPatient(Patient patient);
    public List<Appointment> findByDoctor(User user);
    public List<Appointment> findByStatus(AppointmentStatus appointmentStatus);

    //exist
    public boolean existsById(UUID id);
    public boolean existsByDoctorAndDateAndHour(UUID doctorId, LocalDate date, LocalTime hour);
    public boolean existsByPatientAndDateAndHour(UUID patinetId, LocalDate date, LocalTime hour);

    //operation
    public void save(Appointment appointment);
    public void update(Appointment appointment);
}