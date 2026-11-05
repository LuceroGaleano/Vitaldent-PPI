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

import org.springframework.boot.CommandLineRunner;
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
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.TreatmentRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.UserRepository;
import com.odontologia.Vitaldent_PPI.domain.models.enums.AppointmentStatus;
import com.odontologia.Vitaldent_PPI.domain.models.enums.MethodPayment;
import com.odontologia.Vitaldent_PPI.domain.models.enums.RolUser;

/**
 * Carga datos de demostración al arrancar la aplicación.
 * Es idempotente: cada bloque solo se inserta si no existe ya.
 * Todas las contraseñas de los usuarios de prueba son "123456".
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final String DEFAULT_PASSWORD = "123456";

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final InventoryRepository inventoryRepository;
    private final ItemRepository itemRepository;
    private final TreatmentRepository treatmentRepository;
    private final AppointmentRepository appointmentRepository;
    private final ClinicalRecordRepository clinicalRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final PayRepository payRepository;
    private final PasswordEncoder passwordEncoder;

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
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
        this.treatmentRepository = treatmentRepository;
        this.appointmentRepository = appointmentRepository;
        this.clinicalRecordRepository = clinicalRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.payRepository = payRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // BCrypt es lento a propósito: se cifra una sola vez y se reutiliza el hash.
        String password = passwordEncoder.encode(DEFAULT_PASSWORD);

        // ---------------- Usuarios (2 por rol) ----------------
        createUser("laura.gomez", "Laura Marcela Gómez Restrepo", "1037612345",
                "laura.gomez@vitaldent.com", "3012345678",
                "Carrera 43A # 7-50, El Poblado, Medellín",
                LocalDate.of(1994, 3, 15), RolUser.RECEPTIONIST, password);
        createUser("camilo.zapata", "Camilo Andrés Zapata Henao", "1017234567",
                "camilo.zapata@vitaldent.com", "3105558821",
                "Calle 33 # 74-20, Laureles, Medellín",
                LocalDate.of(1991, 11, 2), RolUser.RECEPTIONIST, password);

        UserEntity valentina = createUser("valentina.ospina", "Valentina Ospina Cardona", "43875421",
                "valentina.ospina@vitaldent.com", "3204419076",
                "Carrera 70 # 44-18, Estadio, Medellín",
                LocalDate.of(1986, 7, 21), RolUser.DOCTOR, password);
        UserEntity santiago = createUser("santiago.mejia", "Santiago Mejía Arango", "71654328",
                "santiago.mejia@vitaldent.com", "3157740392",
                "Calle 10 # 32-45, Envigado, Antioquia",
                LocalDate.of(1983, 1, 30), RolUser.DOCTOR, password);

        createUser("diana.builes", "Diana Carolina Builes Salazar", "1020456789",
                "diana.builes@vitaldent.com", "3002266140",
                "Carrera 65 # 98A-75, Robledo, Medellín",
                LocalDate.of(1992, 9, 8), RolUser.INVENTORY_MANAGER, password);
        createUser("juan.cadavid", "Juan Pablo Cadavid Muñoz", "98567432",
                "juan.cadavid@vitaldent.com", "3186673025",
                "Calle 51 # 45-30, Itagüí, Antioquia",
                LocalDate.of(1988, 5, 12), RolUser.INVENTORY_MANAGER, password);

        UserEntity mariana = createUser("mariana.londono", "Mariana Alejandra Londoño Vélez", "1000987654",
                "mariana.londono@example.com", "3128834410",
                "Carrera 80 # 32-15, Belén, Medellín",
                LocalDate.of(1998, 12, 4), RolUser.PATIENT, password);
        UserEntity andres = createUser("andres.rios", "Andrés Felipe Ríos Giraldo", "1128345671",
                "andres.rios@example.com", "3017795532",
                "Calle 77 Sur # 40-62, Sabaneta, Antioquia",
                LocalDate.of(1985, 4, 19), RolUser.PATIENT, password);

        // ---------------- Inventario, ítems y tratamientos ----------------
        InventoryEntity inventory = seedInventory();
        Map<String, ItemEntity> items = seedItems(inventory);
        Map<String, TreatmentEntity> treatments = seedTreatments(items);

        // ---------------- Citas, historia clínica, factura y pago ----------------
        seedAppointments(valentina, santiago, mariana, andres, treatments);
    }

    // =====================================================================
    // Usuarios y pacientes
    // =====================================================================

    private UserEntity createUser(String userName, String fullName, String document, String email,
            String phone, String address, LocalDate birthDate, RolUser rol, String encodedPassword) {

        UserEntity existing = userRepository.findByUserName(userName);
        if (existing != null) {
            return existing;
        }

        UserEntity user = new UserEntity();
        user.setUserName(userName);
        user.setPassword(encodedPassword);
        user.setFullName(fullName);
        user.setDocument(document);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAddress(address);
        user.setBirthDate(Date.valueOf(birthDate));
        user.setRol(rol);

        // Igual que CreateUser: un usuario PATIENT debe quedar enlazado a su ficha de paciente.
        if (rol == RolUser.PATIENT) {
            user.setPatient(findOrCreatePatient(fullName, document, email, phone, address, birthDate));
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
}