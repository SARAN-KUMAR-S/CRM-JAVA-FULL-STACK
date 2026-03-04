package com.example.myproject.service;


import com.example.myproject.model.Deal;
import com.example.myproject.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DealService {

    @Autowired
    private DealRepository repository;

    public List<Deal> getAllDeals() {
        return repository.findAll();
    }

    public Deal getDealById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Deal saveDeal(Deal deal) {
        return repository.save(deal);
    }

    public Deal updateDeal(Long id, Deal deal) {
        Optional<Deal> existing = repository.findById(id);
        if (existing.isPresent()) {
            Deal d = existing.get();
            d.setTitle(deal.getTitle());
            d.setAmount(deal.getAmount());
            d.setStage(deal.getStage());
            return repository.save(d);
        }
        return null;
    }

    public void deleteDeal(Long id) {
        repository.deleteById(id);
    }
}
