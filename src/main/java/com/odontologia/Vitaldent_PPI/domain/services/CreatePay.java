package com.odontologia.Vitaldent_PPI.domain.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Invoice;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.ports.out.InvoicePort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PayPort;

@Service 
public class CreatePay {
    private final PayPort payPort;
    private final InvoicePort invoicePort;

    public CreatePay(PayPort payPort, InvoicePort invoicePort){
        this.payPort = payPort;
        this.invoicePort = invoicePort;
    }

    public void createPay(Pay pay) throws BusinessException{
        if(pay == null){
            throw new BusinessException("El pago esta vacio");
        }

        if (pay.getAmount() == null || pay.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("El monto a pagar debe ser mayor a cero");
        }

        Invoice invoice = invoicePort.findById(pay.getInvoice().getInvoiceId());
        if(invoice == null){
            throw new BusinessException("Mp se ha encontrado la factura");
        }

        List<Pay> existingPays = payPort.findByInvoiceId(invoice.getInvoiceId());
        BigDecimal totalPaid = existingPays.stream()
                .map(p -> p.getAmount())
                .reduce(BigDecimal.ZERO, (accumulator, current) -> accumulator.add(current));

        BigDecimal remainingBalance = invoice.getTotal().subtract(totalPaid);

        if (remainingBalance.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("Esta factura ya se encuentra totalmente pagada");
        }

        if (pay.getAmount().compareTo(remainingBalance) > 0) {
            throw new BusinessException("El monto ingresado supera el saldo pendiente. Saldo actual: " + remainingBalance);
        }
        pay.setDate(LocalDate.now());
        pay.setInvoice(invoice);
    
        payPort.save(pay);

        BigDecimal newTotalPaid = totalPaid.add(pay.getAmount());
        if (newTotalPaid.compareTo(invoice.getTotal()) >= 0) {
            invoice.setPaid(true);
            invoicePort.update(invoice);
        }
    }
}
