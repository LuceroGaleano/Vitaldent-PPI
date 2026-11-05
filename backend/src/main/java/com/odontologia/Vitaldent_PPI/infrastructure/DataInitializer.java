package com.odontologia.Vitaldent_PPI.infrastructure;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.AppointmentEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.ClinicalRecordEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InventoryEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InvoiceEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.ItemEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PatientEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PayEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.ReminderEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.TreatmentEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.TreatmentItemEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.UserEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.AppointmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.ClinicalRecordRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.InventoryRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.InvoiceRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.ItemRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PatientRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PayRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.ReminderRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.TreatmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;
import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

@Component
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataInitializer implements CommandLineRunner {

    private static final String PATIENT_ADDRESS = "Medellín, Antioquia";
    private static final List<PatientSeed> PATIENTS = List.of(
            new PatientSeed("María Fernanda López", "maria.lopez", "3000000004", "El Poblado", 1995),
            new PatientSeed("Andrés Felipe Torres", "andres.torres", "3000000005", "Laureles", 1992),
            new PatientSeed("Valentina Restrepo Gómez", "valentina.restrepo", "3000000006", "Belén", 1988),
            new PatientSeed("Juan Pablo Montoya", "juan.montoya", "3000000007", "Envigado", 1985),
            new PatientSeed("Camila Ospina Vélez", "camila.ospina", "3000000008", "Robledo", 2000),
            new PatientSeed("Santiago Giraldo Ríos", "santiago.giraldo", "3000000009", "Manrique", 1996),
            new PatientSeed("Isabella Álvarez Mesa", "isabella.alvarez", "3000000010", "La América", 1999),
            new PatientSeed("Nicolás Arango Gil", "nicolas.arango", "3000000011", "Buenos Aires", 1987),
            new PatientSeed("Daniela Cárdenas Ruiz", "daniela.cardenas", "3000000012", "Castilla", 1993),
            new PatientSeed("Mateo Jaramillo Vélez", "mateo.jaramillo", "3000000013", "Guayabal", 2001),
            new PatientSeed("Sara Mejía Restrepo", "sara.mejia", "3000000014", "Laureles", 1997),
            new PatientSeed("Tomás Salazar Duque", "tomas.salazar", "3000000015", "El Poblado", 1989),
            new PatientSeed("Manuela Castaño López", "manuela.castano", "3000000016", "Belén", 2002),
            new PatientSeed("Samuel Montoya Díaz", "samuel.montoya", "3000000017", "Envigado", 1994),
            new PatientSeed("Gabriela Vélez Correa", "gabriela.velez", "3000000018", "La América", 1991));

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;
    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final ClinicalRecordRepository clinicalRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final PayRepository payRepository;
    private final ReminderRepository reminderRepository;
    private final PasswordEncoder passwordEncoder;
    private final String seedPassword;

    public DataInitializer(
            UserRepository userRepository,
            PatientRepository patientRepository,
            InventoryRepository inventoryRepository,
            ItemRepository itemRepository,
            TreatmentRepository treatmentRepository,
            AppointmentRepository appointmentRepository,
            ClinicalRecordRepository clinicalRecordRepository,
            InvoiceRepository invoiceRepository,
            PayRepository payRepository,
            ReminderRepository reminderRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.password:123456}") String seedPassword) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
        this.treatmentRepository = treatmentRepository;
        this.appointmentRepository = appointmentRepository;
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.payRepository = payRepository;
        this.reminderRepository = reminderRepository;
        this.passwordEncoder = passwordEncoder;
        this.seedPassword = seedPassword;
    }

    @Override
    @Transactional
    public void run(String... args) {
        String encodedPassword = passwordEncoder.encode(seedPassword);

        seedUser("laura.gomez", "Laura Marcela Gómez Restrepo", "1037612345",
                "laura.gomez@vitaldent.com", "3012345678", "El Poblado", LocalDate.of(1994, 3, 15),
                RolUser.RECEPTIONIST, null, encodedPassword);
        seedUser("camilo.zapata", "Camilo Andrés Zapata Henao", "1017234567",
                "camilo.zapata@vitaldent.com", "3105558821", "Laureles", LocalDate.of(1991, 11, 2),
                RolUser.RECEPTIONIST, null, encodedPassword);

        UserEntity doctor = seedUser("valentina.ospina", "Valentina Ospina Cardona", "43875421",
                "valentina.ospina@vitaldent.com", "3204419076", "Estadio", LocalDate.of(1986, 7, 21),
                RolUser.DOCTOR, null, encodedPassword);
        UserEntity secondDoctor = seedUser("santiago.mejia", "Santiago Mejía Arango", "71654328",
                "santiago.mejia@vitaldent.com", "3157740392", "Envigado", LocalDate.of(1983, 1, 30),
                RolUser.DOCTOR, null, encodedPassword);

        seedUser("diana.builes", "Diana Carolina Builes Salazar", "1020456789",
                "diana.builes@vitaldent.com", "3002266140", "Robledo", LocalDate.of(1992, 9, 8),
                RolUser.INVENTORY_MANAGER, null, encodedPassword);
        seedUser("juan.cadavid", "Juan Pablo Cadavid Muñoz", "98567432",
                "juan.cadavid@vitaldent.com", "3186673025", "Itagüí", LocalDate.of(1988, 5, 12),
                RolUser.INVENTORY_MANAGER, null, encodedPassword);
        seedUser("recepcion", "Recepcionista Vitaldent", "1000000001",
                "recepcion@vitaldent.test", "3000000001", "Laureles", LocalDate.of(1990, 1, 1),
                RolUser.RECEPTIONIST, null, encodedPassword);
        seedUser("doctor", "Dra. Laura Gómez", "1000000002",
                "doctor@vitaldent.test", "3000000002", "El Poblado", LocalDate.of(1990, 1, 1),
                RolUser.DOCTOR, null, encodedPassword);
        seedUser("inventario", "Carlos Ramírez", "1000000003",
                "inventario@vitaldent.test", "3000000003", "Belén", LocalDate.of(1990, 1, 1),
                RolUser.INVENTORY_MANAGER, null, encodedPassword);

        List<PatientEntity> patients = seedPatients(encodedPassword);
        InventoryEntity inventory = seedInventory();
        Map<String, ItemEntity> items = seedItems(inventory);
        Map<String, TreatmentEntity> treatments = seedTreatments(items);

        seedAppointments(doctor, secondDoctor, patients, treatments);
    }

    private List<PatientEntity> seedPatients(String encodedPassword) {
        List<PatientEntity> patients = new ArrayList<>();
        for (int i = 0; i < PATIENTS.size(); i++) {
            PatientSeed seed = PATIENTS.get(i);
            String document = "100000000" + (i + 4);
            String email = seed.emailPrefix() + "@vitaldent.test";
            LocalDate birthDate = LocalDate.of(seed.birthYear(), 5, 15);
            String address = seed.neighborhood() + ", " + PATIENT_ADDRESS;
            PatientEntity patient = findOrCreatePatient(seed.fullName(), document, email, seed.phone(),
                    address, birthDate);
            seedUser("paciente" + (i + 1), seed.fullName(), document, email, seed.phone(),
                    address, birthDate, RolUser.PATIENT, patient, encodedPassword);
            patients.add(patient);
        }
        return patients;
    }

    private UserEntity seedUser(
            String username,
            String fullName,
            String document,
            String email,
            String phone,
            String neighborhood,
            LocalDate birthDate,
            RolUser role,
            PatientEntity patient,
            String encodedPassword) {
        String address = role == RolUser.PATIENT
                ? PATIENT_ADDRESS
                : neighborhood + ", " + PATIENT_ADDRESS;
        UserEntity user = userRepository.findByUserName(username);
        if (user == null) {
            user = new UserEntity();
            user.setUserName(username);
            user.setDocument(document);
            user.setEmail(email);
            user.setPhone(phone);
            user.setBirthDate(Date.valueOf(birthDate));
            user.setRol(role);
        }

        user.setPassword(encodedPassword);
        user.setFullName(fullName);
        user.setAddress(address);
        if (patient != null) {
            user.setPatient(patient);
        }
        return userRepository.save(user);
    }

    private PatientEntity findOrCreatePatient(
            String fullName,
            String document,
            String email,
            String phone,
            String address,
            LocalDate birthDate) {
        PatientEntity patient = patientRepository.findByDocument(document);
        if (patient == null) {
            patient = new PatientEntity();
            patient.setFullName(fullName);
            patient.setDocument(document);
            patient.setEmail(email);
            patient.setPhone(phone);
            patient.setBirthDate(Date.valueOf(birthDate));
        }
        patient.setAddress(address);
        patient.setFullName(fullName);
        patient.setEmail(email);
        patient.setPhone(phone);
        return patientRepository.save(patient);
    }

    private InventoryEntity seedInventory() {
        InventoryEntity inventory = inventoryRepository.findFirstByOrderByUpdateDateDesc();
        if (inventory != null) {
            return inventory;
        }

        InventoryEntity newInventory = new InventoryEntity();
        newInventory.setUpdateDate(LocalDate.now());
        return inventoryRepository.save(newInventory);
    }

    private Map<String, ItemEntity> seedItems(InventoryEntity inventory) {
        Map<String, ItemEntity> items = new LinkedHashMap<>();
        addItem(items, inventory, "guantes", "Guantes de nitrilo talla M (par)", 300, true);
        addItem(items, inventory, "tapabocas", "Tapabocas desechables (unidad)", 250, true);
        addItem(items, inventory, "anestesia", "Carpule de lidocaína 2% con epinefrina", 120, true);
        addItem(items, inventory, "aguja", "Aguja dental corta calibre 27", 100, true);
        addItem(items, inventory, "resina", "Resina compuesta fotocurable A2 (gramo)", 80, true);
        addItem(items, inventory, "acido", "Ácido grabador 37% (jeringa)", 12, true);
        addItem(items, inventory, "adhesivo", "Adhesivo dental fotocurable (aplicación)", 4, true);
        addItem(items, inventory, "pasta", "Pasta profiláctica (porción)", 60, true);
        addItem(items, inventory, "fluor", "Barniz de flúor (dosis)", 30, true);
        addItem(items, inventory, "gasas", "Gasas estériles (paquete)", 150, true);
        addItem(items, inventory, "eyector", "Eyector de saliva desechable (unidad)", 200, true);
        addItem(items, inventory, "hipoclorito", "Hipoclorito de sodio 2.5% (ml)", 500, true);
        addItem(items, inventory, "gutapercha", "Conos de gutapercha (unidad)", 80, true);
        addItem(items, inventory, "amalgama", "Amalgama dental (cápsula) - descontinuado", 0, false);
        return items;
    }

    private void addItem(
            Map<String, ItemEntity> items,
            InventoryEntity inventory,
            String key,
            String name,
            int stock,
            boolean active) {
        ItemEntity item = itemRepository.findAll().stream()
                .filter(existing -> existing.getName() != null && existing.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    ItemEntity newItem = new ItemEntity();
                    newItem.setName(name);
                    newItem.setStock(stock);
                    newItem.setActive(active);
                    newItem.setInventory(inventory);
                    return itemRepository.save(newItem);
                });
        items.put(key, item);
    }

    private Map<String, TreatmentEntity> seedTreatments(Map<String, ItemEntity> items) {
        Map<String, TreatmentEntity> treatments = new LinkedHashMap<>();
        treatments.put("valoracion", treatmentIfMissing("Consulta de valoración odontológica",
                "Examen clínico completo, diagnóstico y plan de tratamiento.", "50000",
                use(items, "guantes", 1), use(items, "tapabocas", 1), use(items, "eyector", 1)));
        treatments.put("profilaxis", treatmentIfMissing("Profilaxis y limpieza dental",
                "Remoción de placa y cálculo con ultrasonido y pulido de las superficies dentales.", "120000",
                use(items, "guantes", 1), use(items, "tapabocas", 1), use(items, "pasta", 1),
                use(items, "eyector", 1), use(items, "gasas", 1)));
        treatments.put("fluor", treatmentIfMissing("Aplicación de flúor",
                "Aplicación tópica de barniz de flúor para fortalecer el esmalte.", "60000",
                use(items, "guantes", 1), use(items, "fluor", 1), use(items, "gasas", 1)));
        treatments.put("resina", treatmentIfMissing("Restauración en resina (calza)",
                "Remoción de caries y restauración del diente con resina fotocurable.", "180000",
                use(items, "guantes", 1), use(items, "anestesia", 1), use(items, "aguja", 1),
                use(items, "resina", 2), use(items, "acido", 1), use(items, "adhesivo", 1),
                use(items, "eyector", 1)));
        treatments.put("endodoncia", treatmentIfMissing("Endodoncia unirradicular",
                "Tratamiento de conductos en diente de una raíz, con obturación en gutapercha.", "450000",
                use(items, "guantes", 2), use(items, "anestesia", 2), use(items, "aguja", 1),
                use(items, "hipoclorito", 20), use(items, "gutapercha", 3), use(items, "gasas", 2)));
        treatments.put("exodoncia", treatmentIfMissing("Exodoncia simple",
                "Extracción de pieza dental sin complicaciones quirúrgicas.", "150000",
                use(items, "guantes", 1), use(items, "anestesia", 2), use(items, "aguja", 1),
                use(items, "gasas", 2)));
        return treatments;
    }

    private TreatmentEntity treatmentIfMissing(
            String name,
            String description,
            String cost,
            Usage... usages) {
        TreatmentEntity existing = treatmentRepository.findAll().stream()
                .filter(treatment -> treatment.getName() != null
                        && treatment.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
        if (existing != null) {
            return existing;
        }

        TreatmentEntity treatment = new TreatmentEntity();
        treatment.setName(name);
        treatment.setDescription(description);
        treatment.setCost(new BigDecimal(cost));
        List<TreatmentItemEntity> treatmentItems = new ArrayList<>();
        for (Usage usage : usages) {
            TreatmentItemEntity treatmentItem = new TreatmentItemEntity();
            treatmentItem.setTreatment(treatment);
            treatmentItem.setItem(usage.item());
            treatmentItem.setQuantityUsed(usage.quantity());
            treatmentItems.add(treatmentItem);
        }
        treatment.setTreatmentItems(treatmentItems);
        return treatmentRepository.save(treatment);
    }

    private Usage use(Map<String, ItemEntity> items, String key, int quantity) {
        ItemEntity item = items.get(key);
        if (item == null) {
            throw new IllegalStateException("No se encontró el insumo requerido: " + key);
        }
        return new Usage(item, quantity);
    }

    private void seedAppointments(
            UserEntity doctor,
            UserEntity secondDoctor,
            List<PatientEntity> patients,
            Map<String, TreatmentEntity> treatments) {
        for (int i = 0; i < patients.size(); i++) {
            boolean completed = i < 5;
            UserEntity assignedDoctor = i % 2 == 0 ? doctor : secondDoctor;
            LocalDate date = completed ? businessDay(-7 - i) : businessDay(i - 3);
            LocalTime time = LocalTime.of(9 + (i % 7), 0);
            AppointmentStatus status = completed
                    ? AppointmentStatus.COMPLETED
                    : AppointmentStatus.SCHEDULED;
            AppointmentEntity appointment = findOrCreateAppointment(
                    assignedDoctor, patients.get(i), date, time, status);

            if (completed) {
                TreatmentEntity treatment = i % 2 == 0
                        ? treatments.get("resina")
                        : treatments.get("profilaxis");
                ClinicalRecordEntity record = findOrCreateClinicalRecord(appointment, treatment);
                InvoiceEntity invoice = findOrCreateInvoice(record);
                seedPayment(invoice);
            } else {
                seedReminder(appointment);
            }
        }

        for (int i = 0; i < 5; i++) {
            UserEntity assignedDoctor = i % 2 == 0 ? doctor : secondDoctor;
            findOrCreateAppointment(
                    assignedDoctor,
                    null,
                    businessDay(i + 11),
                    LocalTime.of(9 + i, 0),
                    AppointmentStatus.AVAILABLE);
        }
    }

    private AppointmentEntity findOrCreateAppointment(
            UserEntity doctor,
            PatientEntity patient,
            LocalDate date,
            LocalTime time,
            AppointmentStatus status) {
        AppointmentEntity existing = appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getDoctor() != null
                        && appointment.getDoctor().getUserId().equals(doctor.getUserId())
                        && Objects.equals(appointment.getDate(), date)
                        && Objects.equals(appointment.getHour(), time))
                .findFirst()
                .orElse(null);
        if (existing != null) {
            return existing;
        }

        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setDate(date);
        appointment.setHour(time);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentStatus(status);
        return appointmentRepository.save(appointment);
    }

    private ClinicalRecordEntity findOrCreateClinicalRecord(
            AppointmentEntity appointment,
            TreatmentEntity treatment) {
        ClinicalRecordEntity existing =
                clinicalRecordRepository.findByAppointment_AppointmentId(appointment.getAppointmentId());
        if (existing != null) {
            return existing;
        }

        ClinicalRecordEntity record = new ClinicalRecordEntity();
        record.setDate(appointment.getDate());
        record.setReasonForConsultation("Consulta odontológica de control.");
        record.setRecord("Atención realizada sin complicaciones.");
        record.setDiagnostic("Paciente estable; continuar controles preventivos.");
        record.setAppointment(appointment);
        record.setTreatment(treatment);
        return clinicalRecordRepository.save(record);
    }

    private InvoiceEntity findOrCreateInvoice(ClinicalRecordEntity record) {
        InvoiceEntity existing = invoiceRepository
                .findByClinicalRecord_ClinicalRecordId(record.getClinicalRecordId());
        if (existing != null) {
            return existing;
        }

        InvoiceEntity invoice = new InvoiceEntity();
        invoice.setDate(record.getDate());
        invoice.setTotal(record.getTreatment().getCost());
        invoice.setPaid(true);
        invoice.setClinicalRecord(record);
        return invoiceRepository.save(invoice);
    }

    private void seedPayment(InvoiceEntity invoice) {
        if (!payRepository.findByInvoice_InvoiceId(invoice.getInvoiceId()).isEmpty()) {
            return;
        }

        PayEntity payment = new PayEntity();
        payment.setAmount(invoice.getTotal());
        payment.setDate(invoice.getDate());
        payment.setMethodPayment(MethodPayment.CARD);
        payment.setState("PAID");
        payment.setInvoice(invoice);
        payRepository.save(payment);
    }

    private void seedReminder(AppointmentEntity appointment) {
        if (!reminderRepository.findByAppointmentId(appointment.getAppointmentId()).isEmpty()) {
            return;
        }

        ReminderEntity reminder = new ReminderEntity();
        reminder.setAppointmentId(appointment.getAppointmentId());
        reminder.setDate(appointment.getDate());
        reminder.setChanel(ReminderChannel.EMAIL);
        reminderRepository.save(reminder);
    }

    private LocalDate businessDay(int offset) {
        LocalDate date = LocalDate.now();
        int step = offset >= 0 ? 1 : -1;
        int remaining = Math.abs(offset);
        while (remaining > 0) {
            date = date.plusDays(step);
            DayOfWeek day = date.getDayOfWeek();
            if (day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY) {
                remaining--;
            }
        }
        return date;
    }

    private record PatientSeed(
            String fullName,
            String emailPrefix,
            String phone,
            String neighborhood,
            int birthYear) {
    }

    private record Usage(ItemEntity item, int quantity) {
    }
}
