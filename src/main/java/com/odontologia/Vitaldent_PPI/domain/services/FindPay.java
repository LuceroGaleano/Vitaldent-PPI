package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Pay;
import com.odontologia.Vitaldent_PPI.domain.ports.out.PayPort;

@Service 
public class FindPay {
    private final PayPort payPort;

    @Autowired 
    public FindPay(PayPort payPort){
        this.payPort = payPort;
    }

    public Pay findById(UUID id) throws NotFoundException{
        Pay pay = payPort.findById(id);
        if(pay == null){
            throw new  NotFoundException("No se ha encontrado el pago");
        }
        return pay;
    }

    public List<Pay> findByInvoiceId(UUID idInvoice) throws NotFoundException{
        List<Pay> pays = payPort.findByInvoiceId(idInvoice);
        if(pays == null || pays.isEmpty()){
            throw new NotFoundException("La factura no tiene pagos registrados");
        }
        return pays;
    }
}
