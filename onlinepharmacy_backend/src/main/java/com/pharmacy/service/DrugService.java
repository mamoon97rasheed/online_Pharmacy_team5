package com.pharmacy.service;

import com.pharmacy.model.Drug;
import com.pharmacy.repository.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pharmacy.service.DrugService;


import java.util.List;

@Service
public class DrugService {
    @Autowired
    private DrugRepository drugRepo;

    public List<Drug> getAllDrugs() {
        return drugRepo.findAll();
    }

    public Drug addDrug(Drug drug) {
        return drugRepo.save(drug);
    }

    public Drug updateDrug(int id, Drug dto) {
        return drugRepo.findById(id).map(d -> {
            d.setName(dto.getName());
            d.setDescription(dto.getDescription());
            d.setPrice(dto.getPrice());
            d.setQuantityAvailable(dto.getQuantityAvailable());
            return drugRepo.save(d);
        }).orElse(null);
    }

    public boolean deleteDrug(int id) {
        return drugRepo.findById(id).map(d -> {
            drugRepo.delete(d);
            return true;
        }).orElse(false);
    }
}
