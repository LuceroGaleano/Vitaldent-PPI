package com.odontologia.Vitaldent_PPI.domain.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.odontologia.Vitaldent_PPI.domain.exceptions.NotFoundException;
import com.odontologia.Vitaldent_PPI.domain.models.Treatment;
import com.odontologia.Vitaldent_PPI.domain.ports.out.TreatmentPort;

@Service 
public class FindTreatment {
    private final TreatmentPort treatmentPort;

    @Autowired 
    public FindTreatment(TreatmentPort treatmentPort){
        this.treatmentPort = treatmentPort;
    }

    public Treatment findById(UUID id) throws NotFoundException{
        Treatment treatment = treatmentPort.findById(id);
        if(treatment == null){
            throw new NotFoundException("No se ha encontrado el tratamiento");
        }
        return treatment;
    }

        public List<Treatment> findAll() throws NotFoundException {
            List<Treatment> treatments = treatmentPort.findAll();
            if (treatments.isEmpty()) {
                throw new NotFoundException("No hay tratamientos registrados en el sistema");
            }
            return treatments;
        }
}
