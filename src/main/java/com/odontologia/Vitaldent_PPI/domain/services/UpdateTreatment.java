package com.odontologia.Vitaldent_PPI.domain.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.BusinessException;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.models.TreatmentItem;
import com.odontologia.Vitaldent_PPI.domain.ports.out.ItemPort;
import com.odontologia.Vitaldent_PPI.domain.ports.out.TreatmentPort;

@Service 
public class UpdateTreatment {
    private final TreatmentPort treatmentPort;
    private final ItemPort itemPort;

    @Autowired
    public UpdateTreatment(TreatmentPort treatmentPort, ItemPort itemPort){
        this.treatmentPort = treatmentPort;
        this.itemPort = itemPort;
    }

    public void updateTreatment(Treatment treatment) throws BusinessException{
        if(treatment == null){
            throw new BusinessException("Tratamiento no entregado");
        }

        if(treatmentPort.existsById(treatment.getTreatamentId())){
            throw new BusinessException("No se ha encontraod el tratamiento en la base de datos");
        }

        if(treatment.getCost().compareTo(BigDecimal.ZERO) <=0){
            throw new BusinessException ("El costo debe ser mayor a 0");
        }

        
        if(treatment.getTreatmentItems() != null){
            for(TreatmentItem treatmentItem : treatment.getTreatmentItems()){
                if(treatmentItem == null){
                    throw new BusinessException("Insumo invalido en el tratamiento");
                }
                if(treatmentItem.getQuantityUsed() <= 0){
                    throw new BusinessException("La cantidad usada del insumo debe ser mayor a 0");
                }
                if(!itemPort.existsById(treatmentItem.getItem().getItemId())){
                    throw new BusinessException("El insumo no se encuentra en la base de datos");
                }
            }
        }

        treatmentPort.update(treatment);
    }
}
