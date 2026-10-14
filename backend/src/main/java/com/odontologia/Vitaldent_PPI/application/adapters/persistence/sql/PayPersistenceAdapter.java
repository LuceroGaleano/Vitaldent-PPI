package com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.InvoiceEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.entities.PayEntity;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.InvoiceRepository;
import com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories.PayRepository;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PayPort;

@Service
public class PayPersistenceAdapter implements PayPort {
    private final PayRepository payRepository;
    private final InvoiceRepository invoiceRepository;

    public PayPersistenceAdapter(PayRepository payRepository, InvoiceRepository invoiceRepository) {
        this.payRepository = payRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public Pay findById(UUID id) {
        return toModel(payRepository.findById(id).orElse(null));
    }

    @Override
    public List<Pay> findByInvoiceId(UUID invoiceId) {
        List<Pay> payments = new ArrayList<>();
        for (PayEntity entity : payRepository.findByInvoice_InvoiceId(invoiceId)) {
            payments.add(toModel(entity));
        }
        return payments;
    }

    @Override
    public boolean existsById(UUID id) {
        return payRepository.existsById(id);
    }

    @Override
    public void save(Pay pay) {
        PayEntity savedEntity = payRepository.save(toEntity(pay));
        pay.setPayId(savedEntity.getPayId());
    }

    private Pay toModel(PayEntity entity) {
        if (entity == null) {
            return null;
        }
        Pay pay = new Pay();
        pay.setPayId(entity.getPayId());
        pay.setAmount(entity.getAmount());
        pay.setDate(entity.getDate());
        pay.setMethodPayment(entity.getMethodPayment());
        pay.setState(entity.getState());
        pay.setInvoiceId(entity.getInvoice() == null ? null : entity.getInvoice().getInvoiceId());
        return pay;
    }

    private PayEntity toEntity(Pay pay) {
        PayEntity entity = new PayEntity();
        entity.setAmount(pay.getAmount());
        entity.setDate(pay.getDate());
        entity.setMethodPayment(pay.getMethodPayment());
        entity.setState(pay.getState());
        if (pay.getInvoiceId() != null) {
            InvoiceEntity invoiceEntity = invoiceRepository
                .findById(pay.getInvoiceId())
                .orElseThrow(() -> new IllegalArgumentException("No existe la factura asociada"));
            entity.setInvoice(invoiceEntity);
        }
        return entity;
    }
}
