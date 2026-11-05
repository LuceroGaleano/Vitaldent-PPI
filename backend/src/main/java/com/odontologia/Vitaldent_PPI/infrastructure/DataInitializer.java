package com.odontologia.Vitaldent_PPI.infrastructure;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
<<<<<<< HEAD
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
=======
import java.util.List;
import java.util.Objects;
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)

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
<<<<<<< HEAD
=======
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.ReminderEntity;
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
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
<<<<<<< HEAD
=======
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.ReminderRepository;
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.TreatmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;
<<<<<<< HEAD
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

/**
 * Carga datos de demostración al arrancar la aplicación.
 * Es idempotente: cada bloque solo se inserta si no existe ya.
 * Todas las contraseñas de los usuarios de prueba son "123456".
 */
=======
import com.odontologia.Vitaldent_PPI.domain.models.enums.ReminderChannel;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

import jakarta.transaction.Transactional;

>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
@Component
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataInitializer implements CommandLineRunner {

    private static final String DEFAULT_PASSWORD = "123456";

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;
<<<<<<< HEAD
    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final ClinicalRecordRepository clinicalRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final PayRepository payRepository;
=======
    private final AppointmentRepository appointmentRepository;
    private final TreatmentRepository treatmentRepository;
    private final ClinicalRecordRepository clinicalRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final PayRepository payRepository;
    private final ReminderRepository reminderRepository;
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
    private final PasswordEncoder passwordEncoder;
    private final String seedPassword;

<<<<<<< HEAD
    public DataInitializer(UserRepository userRepository,
            PatientRepository patientRepository,
            InventoryRepository inventoryRepository,
            ItemRepository itemRepository,
            TreatmentRepository treatmentRepository,
            AppointmentRepository appointmentRepository,
            ClinicalRecordRepository clinicalRecordRepository,
            InvoiceRepository invoiceRepository,
            PayRepository payRepository,
            PasswordEncoder passwordEncoder) {
=======
    public DataInitializer(
            UserRepository userRepository,
            PatientRepository patientRepository,
            InventoryRepository inventoryRepository,
            ItemRepository itemRepository,
            AppointmentRepository appointmentRepository,
            TreatmentRepository treatmentRepository,
            ClinicalRecordRepository clinicalRecordRepository,
            InvoiceRepository invoiceRepository,
            PayRepository payRepository,
            ReminderRepository reminderRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.password}") String seedPassword) {
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
<<<<<<< HEAD
        this.treatmentRepository = treatmentRepository;
        this.appointmentRepository = appointmentRepository;
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.payRepository = payRepository;
=======
        this.appointmentRepository = appointmentRepository;
        this.treatmentRepository = treatmentRepository;
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.payRepository = payRepository;
        this.reminderRepository = reminderRepository;
>>>>>>> 126c588 (refactor: Dataseeder add to Datainitializer)
        this.passwordEncoder = passwordEncoder;
        this.seedPassword = seedPassword;
    }

    @Override
    @Transactional
    public void run(String... args) {
        InventoryEntity inventory = seedInventory();
        List<ItemEntity> items = seedItems(inventory);

        UserEntity doctor = seedUser("doctor", "1000000002", "Dra. Laura Gómez",
                "doctor@vitaldent.test", RolUser.DOCTOR, null);
        seedUser("inventario", "1000000003", "Carlos Ramírez",
                "inventario@vitaldent.test", RolUser.INVENTORY_MANAGER, null);
        seedUser("recepcion", "1000000001", "Recepcionista Vitaldent",
                "recepcion@vitaldent.test", RolUser.RECEPTIONIST, null);

        List<PatientSeed> patientSeeds = List.of(
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
        List<PatientEntity> patients = new ArrayList<>();
        for (int i = 0; i < patientSeeds.size(); i++) {
            PatientSeed patientSeed = patientSeeds.get(i);
            String document = "100000000" + (i + 4);
            PatientEntity patient = seedPatient(document, patientSeed);
            seedUser("paciente" + (i + 1), patient.getDocument(), patient.getFullName(),
                    patient.getEmail(), RolUser.PATIENT, patient);
            patients.add(patient);
        }

        TreatmentEntity cleaning = seedTreatment(
                "Limpieza dental",
                "Profilaxis, eliminación de placa y pulido dental.",
                "120000.00",
                items,
                "Guantes de nitrilo", "Mascarillas", "Pasta profiláctica");
        TreatmentEntity restoration = seedTreatment(
                "Restauración en resina",
                "Tratamiento de caries con resina compuesta.",
                "180000.00",
                items,
                "Guantes de nitrilo", "Mascarillas", "Resina compuesta", "Anestesia dental");

        LocalDate today = LocalDate.now();
        for (int i = 0; i < patients.size(); i++) {
            boolean completed = i < 5;
            LocalDate appointmentDate = completed
                    ? today.minusDays(7L + i)
                    : today.plusDays(i - 4L);
            LocalTime appointmentTime = LocalTime.of(9 + (i % 7), 0);
            AppointmentStatus status = completed
                    ? AppointmentStatus.COMPLETED
                    : AppointmentStatus.SCHEDULED;
            AppointmentEntity appointment = seedAppointment(
                    doctor, patients.get(i), appointmentDate, appointmentTime, status);

            if (completed) {
                LocalDate recordDate = appointment.getDate();
                TreatmentEntity treatment = i % 2 == 0 ? cleaning : restoration;
                ClinicalRecordEntity clinicalRecord = seedClinicalRecord(appointment, treatment, recordDate);
                InvoiceEntity invoice = seedInvoice(clinicalRecord, recordDate);
                seedPayment(invoice, recordDate);
            } else {
                seedReminder(appointment, appointment.getDate());
            }
        }

        seedTreatment(
                "Valoración odontológica",
                "Examen inicial y plan de tratamiento.",
                "50000.00",
                items);

        for (int i = 0; i < 5; i++) {
            seedAppointment(
                    doctor,
                    null,
                    today.plusDays(11L + i),
                    LocalTime.of(9 + i, 0),
                    AppointmentStatus.AVAILABLE);
        }
        return userRepository.save(user);
    }

    private PatientEntity findOrCreatePatient(String fullName, String document, String email,
            String phone, String address, LocalDate birthDate) {

        PatientEntity existing = patientRepository.findByDocument(document);
        if (existing != null) {
            return existing;
        }

        PatientEntity patient = new PatientEntity();
        patient.setPatientId(null); // evita que save() haga merge con el UUID inicial de la entidad
        patient.setFullName(fullName);
        patient.setDocument(document);
        patient.setEmail(email);
        patient.setPhone(phone);
        patient.setAddress(address);
        patient.setBirthDate(Date.valueOf(birthDate));
        return patientRepository.save(patient);
    }

    // =====================================================================
    // Inventario
    // =====================================================================

    private InventoryEntity seedInventory() {
        InventoryEntity existing = inventoryRepository.findFirstByOrderByUpdateDateDesc();
        if (existing != null) {
            return existing;
        }
        InventoryEntity inventory = new InventoryEntity();
        inventory.setUpdateDate(LocalDate.now());
        return inventoryRepository.save(inventory);
    }

    private Map<String, ItemEntity> seedItems(InventoryEntity inventory) {
        Map<String, ItemEntity> items = new LinkedHashMap<>();
        if (itemRepository.count() > 0) {
            return items; // ya hay ítems cargados; los tratamientos también se omitirán
        }

        items.put("guantes", item("Guantes de nitrilo talla M (par)", 300, true, inventory));
        items.put("tapabocas", item("Tapabocas desechables (unidad)", 250, true, inventory));
        items.put("anestesia", item("Carpule de lidocaína 2% con epinefrina", 120, true, inventory));
        items.put("aguja", item("Aguja dental corta calibre 27", 100, true, inventory));
        items.put("resina", item("Resina compuesta fotocurable A2 (gramo)", 80, true, inventory));
        items.put("acido", item("Ácido grabador 37% (jeringa)", 12, true, inventory));
        items.put("adhesivo", item("Adhesivo dental fotocurable (aplicación)", 4, true, inventory)); // stock bajo
        items.put("pasta", item("Pasta profiláctica (porción)", 60, true, inventory));
        items.put("fluor", item("Barniz de flúor (dosis)", 30, true, inventory));
        items.put("gasas", item("Gasas estériles (paquete)", 150, true, inventory));
        items.put("eyector", item("Eyector de saliva desechable (unidad)", 200, true, inventory));
        items.put("hipoclorito", item("Hipoclorito de sodio 2.5% (ml)", 500, true, inventory));
        items.put("gutapercha", item("Conos de gutapercha (unidad)", 80, true, inventory));
        items.put("amalgama", item("Amalgama dental (cápsula) - descontinuado", 0, false, inventory)); // inactivo
        return items;
    }

    private ItemEntity item(String name, int stock, boolean active, InventoryEntity inventory) {
        ItemEntity item = new ItemEntity();
        item.setName(name);
        item.setStock(stock);
        item.setActive(active);
        item.setInventory(inventory);
        return itemRepository.save(item);
    }

    // =====================================================================
    // Tratamientos
    // =====================================================================

    private Map<String, TreatmentEntity> seedTreatments(Map<String, ItemEntity> items) {
        Map<String, TreatmentEntity> treatments = new LinkedHashMap<>();
        if (items.isEmpty() || treatmentRepository.count() > 0) {
            return treatments;
        }

        treatments.put("valoracion", treatment("Consulta de valoración odontológica",
                "Examen clínico completo, diagnóstico y plan de tratamiento.", "50000",
                use(items, "guantes", 1), use(items, "tapabocas", 1), use(items, "eyector", 1)));

        treatments.put("profilaxis", treatment("Profilaxis y limpieza dental",
                "Remoción de placa y cálculo con ultrasonido y pulido de las superficies dentales.", "120000",
                use(items, "guantes", 1), use(items, "tapabocas", 1), use(items, "pasta", 1),
                use(items, "eyector", 1), use(items, "gasas", 1)));

        treatments.put("fluor", treatment("Aplicación de flúor",
                "Aplicación tópica de barniz de flúor para fortalecer el esmalte.", "60000",
                use(items, "guantes", 1), use(items, "fluor", 1), use(items, "gasas", 1)));

        treatments.put("resina", treatment("Restauración en resina (calza)",
                "Remoción de caries y restauración del diente con resina fotocurable.", "180000",
                use(items, "guantes", 1), use(items, "anestesia", 1), use(items, "aguja", 1),
                use(items, "resina", 2), use(items, "acido", 1), use(items, "adhesivo", 1),
                use(items, "eyector", 1)));

        treatments.put("endodoncia", treatment("Endodoncia unirradicular",
                "Tratamiento de conductos en diente de una raíz, con obturación en gutapercha.", "450000",
                use(items, "guantes", 2), use(items, "anestesia", 2), use(items, "aguja", 1),
                use(items, "hipoclorito", 20), use(items, "gutapercha", 3), use(items, "gasas", 2)));

        treatments.put("exodoncia", treatment("Exodoncia simple",
                "Extracción de pieza dental sin complicaciones quirúrgicas.", "150000",
                use(items, "guantes", 1), use(items, "anestesia", 2), use(items, "aguja", 1),
                use(items, "gasas", 2)));

        return treatments;
    }

    private record Usage(ItemEntity item, int quantity) {
    }

    private Usage use(Map<String, ItemEntity> items, String key, int quantity) {
        return new Usage(items.get(key), quantity);
    }

    private TreatmentEntity treatment(String name, String description, String cost, Usage... usages) {
        TreatmentEntity treatment = new TreatmentEntity();
        treatment.setName(name);
        treatment.setDescription(description);
        treatment.setCost(new BigDecimal(cost));

        List<TreatmentItemEntity> treatmentItems = new ArrayList<>();
        for (Usage usage : usages) {
            TreatmentItemEntity ti = new TreatmentItemEntity();
            ti.setTreatment(treatment);
            ti.setItem(usage.item());
            ti.setQuantityUsed(usage.quantity());
            treatmentItems.add(ti);
        }
        treatment.setTreatmentItems(treatmentItems);

        // cascade = ALL: guarda también los treatment_items
        return treatmentRepository.save(treatment);
    }

    // =====================================================================
    // Citas, historia clínica, factura y pago
    // =====================================================================

    private void seedAppointments(UserEntity valentina, UserEntity santiago,
            UserEntity mariana, UserEntity andres, Map<String, TreatmentEntity> treatments) {

        if (appointmentRepository.count() > 0 || treatments.isEmpty()) {
            return;
        }

        PatientEntity marianaPatient = mariana.getPatient();
        PatientEntity andresPatient = andres.getPatient();

        // Cita pasada ya atendida: historia clínica + factura pagada + pago
        AppointmentEntity completed = appointment(businessDay(-7), LocalTime.of(9, 0),
                valentina, marianaPatient, AppointmentStatus.COMPLETED);

        TreatmentEntity resina = treatments.get("resina");

        ClinicalRecordEntity record = new ClinicalRecordEntity();
        record.setDate(completed.getDate());
        record.setReasonForConsultation("Dolor al masticar y sensibilidad al frío en molar inferior derecho.");
        record.setRecord("Paciente sin antecedentes sistémicos relevantes. Al examen clínico se observa "
                + "lesión cariosa oclusal en pieza 46, sin compromiso pulpar. Se realiza anestesia local, "
                + "remoción de tejido cariado y restauración en resina fotocurable A2.");
        record.setDiagnostic("Caries de dentina en pieza 46 (K02.1).");
        record.setAppointment(completed);
        record.setTreatment(resina);
        record = clinicalRecordRepository.save(record);

        InvoiceEntity invoice = new InvoiceEntity();
        invoice.setDate(completed.getDate());
        invoice.setTotal(resina.getCost());
        invoice.setPaid(true);
        invoice.setClinicalRecord(record);
        invoice = invoiceRepository.save(invoice);

        PayEntity pay = new PayEntity();
        pay.setAmount(resina.getCost());
        pay.setDate(completed.getDate());
        pay.setMethodPayment(MethodPayment.CARD);
        pay.setState("PAID");
        pay.setInvoice(invoice);
        payRepository.save(pay);

        // Citas agendadas (próximos días hábiles)
        appointment(businessDay(1), LocalTime.of(9, 0), valentina, marianaPatient, AppointmentStatus.SCHEDULED);
        appointment(businessDay(2), LocalTime.of(10, 30), santiago, andresPatient, AppointmentStatus.SCHEDULED);

        // Horarios disponibles
        appointment(businessDay(1), LocalTime.of(10, 0), valentina, null, AppointmentStatus.AVAILABLE);
        appointment(businessDay(2), LocalTime.of(8, 0), valentina, null, AppointmentStatus.AVAILABLE);
        appointment(businessDay(2), LocalTime.of(9, 0), santiago, null, AppointmentStatus.AVAILABLE);
        appointment(businessDay(3), LocalTime.of(14, 0), santiago, null, AppointmentStatus.AVAILABLE);
        appointment(businessDay(3), LocalTime.of(15, 0), santiago, null, AppointmentStatus.AVAILABLE);
    }

    private AppointmentEntity appointment(LocalDate date, LocalTime hour, UserEntity doctor,
            PatientEntity patient, AppointmentStatus status) {
        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setDate(date);
        appointment.setHour(hour);
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentStatus(status);
        return appointmentRepository.save(appointment);
    }

    /** Devuelve hoy +/- n días hábiles (salta sábados y domingos). */
    private LocalDate businessDay(int offset) {
        LocalDate date = LocalDate.now();
        int step = offset >= 0 ? 1 : -1;
        int remaining = Math.abs(offset);
        while (remaining > 0) {
            date = date.plusDays(step);
            if (date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY) {
                remaining--;
            }
        }
        return date;
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

    private List<ItemEntity> seedItems(InventoryEntity inventory) {
        List<ItemEntity> items = new ArrayList<>();
        addItemIfMissing(items, inventory, "Guantes de nitrilo", 250);
        addItemIfMissing(items, inventory, "Mascarillas", 300);
        addItemIfMissing(items, inventory, "Pasta profiláctica", 40);
        addItemIfMissing(items, inventory, "Resina compuesta", 60);
        addItemIfMissing(items, inventory, "Anestesia dental", 80);
        addItemIfMissing(items, inventory, "Gasas estériles", 200);
        return items;
    }

    private void addItemIfMissing(List<ItemEntity> seededItems, InventoryEntity inventory, String name, int stock) {
        ItemEntity item = itemRepository.findAll().stream()
                .filter(existing -> existing.getName() != null && existing.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    ItemEntity newItem = new ItemEntity();
                    newItem.setName(name);
                    newItem.setStock(stock);
                    newItem.setActive(true);
                    newItem.setInventory(inventory);
                    return itemRepository.save(newItem);
                });
        seededItems.add(item);
    }

    private UserEntity seedUser(
            String username,
            String document,
            String fullName,
            String email,
            RolUser role,
            PatientEntity patient) {
        UserEntity existing = userRepository.findByUserName(username);
        if (existing != null) {
            existing.setPassword(passwordEncoder.encode(seedPassword));
            existing.setAddress("Medellín, Antioquia");
            if (patient != null) {
                existing.setPatient(patient);
            }
            userRepository.save(existing);
            return existing;
        }

        UserEntity user = new UserEntity();
        user.setUserName(username);
        user.setPassword(passwordEncoder.encode(seedPassword));
        user.setFullName(fullName);
        user.setDocument(document);
        user.setEmail(email);
        user.setPhone("3000000000");
        user.setAddress("Medellín, Antioquia");
        user.setBirthDate(Date.valueOf(LocalDate.of(1990, 1, 1)));
        user.setRol(role);
        user.setPatient(patient);
        return userRepository.save(user);
    }

    private PatientEntity seedPatient(String document, PatientSeed seed) {
        PatientEntity existing = patientRepository.findByDocument(document);
        if (existing != null) {
            existing.setAddress(seed.neighborhood() + ", Medellín, Antioquia");
            return patientRepository.save(existing);
        }

        PatientEntity patient = new PatientEntity();
        patient.setFullName(seed.fullName());
        patient.setDocument(document);
        patient.setPhone(seed.phone());
        patient.setEmail(seed.email() + "@vitaldent.test");
        patient.setAddress(seed.neighborhood() + ", Medellín, Antioquia");
        patient.setBirthDate(Date.valueOf(LocalDate.of(seed.birthYear(), 5, 15)));
        return patientRepository.save(patient);
    }

    private record PatientSeed(String fullName, String email, String phone, String neighborhood, int birthYear) {
    }

    private TreatmentEntity seedTreatment(
            String name,
            String description,
            String cost,
            List<ItemEntity> items,
            String... itemNames) {
        return treatmentRepository.findAll().stream()
                .filter(existing -> existing.getName() != null && existing.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElseGet(() -> {
                    TreatmentEntity treatment = new TreatmentEntity();
                    treatment.setName(name);
                    treatment.setDescription(description);
                    treatment.setCost(new BigDecimal(cost));
                    List<TreatmentItemEntity> treatmentItems = new ArrayList<>();
                    for (String itemName : itemNames) {
                        ItemEntity item = items.stream()
                                .filter(candidate -> candidate.getName().equalsIgnoreCase(itemName))
                                .findFirst()
                                .orElseThrow(() -> new IllegalStateException(
                                        "No se encontró el insumo para el tratamiento: " + itemName));
                        TreatmentItemEntity treatmentItem = new TreatmentItemEntity();
                        treatmentItem.setTreatment(treatment);
                        treatmentItem.setItem(item);
                        treatmentItem.setQuantityUsed(1);
                        treatmentItems.add(treatmentItem);
                    }
                    treatment.setTreatmentItems(treatmentItems);
                    return treatmentRepository.save(treatment);
                });
    }

    private AppointmentEntity seedAppointment(
            UserEntity doctor,
            PatientEntity patient,
            LocalDate date,
            LocalTime hour,
            AppointmentStatus status) {
        AppointmentEntity existing = appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getDoctor() != null
                        && appointment.getDoctor().getUserId().equals(doctor.getUserId())
                        && Objects.equals(appointment.getDate(), date)
                        && Objects.equals(appointment.getHour(), hour))
                .findFirst()
                .orElse(null);
        if (existing != null) {
            return existing;
        }

        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(date);
        appointment.setHour(hour);
        appointment.setAppointmentStatus(status);
        return appointmentRepository.save(appointment);
    }

    private ClinicalRecordEntity seedClinicalRecord(
            AppointmentEntity appointment,
            TreatmentEntity treatment,
            LocalDate date) {
        ClinicalRecordEntity existing =
                clinicalRecordRepository.findByAppointment_AppointmentId(appointment.getAppointmentId());
        if (existing != null) {
            return existing;
        }

        ClinicalRecordEntity clinicalRecord = new ClinicalRecordEntity();
        clinicalRecord.setAppointment(appointment);
        clinicalRecord.setTreatment(treatment);
        clinicalRecord.setDate(date);
        clinicalRecord.setReasonForConsultation("Limpieza y revisión general");
        clinicalRecord.setRecord("Profilaxis realizada sin complicaciones.");
        clinicalRecord.setDiagnostic("Paciente con salud oral estable.");
        return clinicalRecordRepository.save(clinicalRecord);
    }

    private InvoiceEntity seedInvoice(ClinicalRecordEntity clinicalRecord, LocalDate date) {
        InvoiceEntity existing =
                invoiceRepository.findByClinicalRecord_ClinicalRecordId(clinicalRecord.getClinicalRecordId());
        if (existing != null) {
            return existing;
        }

        InvoiceEntity invoice = new InvoiceEntity();
        invoice.setClinicalRecord(clinicalRecord);
        invoice.setDate(date);
        invoice.setTotal(clinicalRecord.getTreatment().getCost());
        invoice.setPaid(true);
        return invoiceRepository.save(invoice);
    }

    private void seedPayment(InvoiceEntity invoice, LocalDate date) {
        if (!payRepository.findByInvoice_InvoiceId(invoice.getInvoiceId()).isEmpty()) {
            return;
        }

        PayEntity payment = new PayEntity();
        payment.setInvoice(invoice);
        payment.setAmount(invoice.getTotal());
        payment.setDate(date);
        payment.setMethodPayment(MethodPayment.CARD);
        payment.setState("COMPLETED");
        payRepository.save(payment);
    }

    private void seedReminder(AppointmentEntity appointment, LocalDate date) {
        if (!reminderRepository.findByAppointmentId(appointment.getAppointmentId()).isEmpty()) {
            return;
        }

        ReminderEntity reminder = new ReminderEntity();
        reminder.setAppointmentId(appointment.getAppointmentId());
        reminder.setDate(date);
        reminder.setChanel(ReminderChannel.EMAIL);
        reminderRepository.save(reminder);
    }
}
