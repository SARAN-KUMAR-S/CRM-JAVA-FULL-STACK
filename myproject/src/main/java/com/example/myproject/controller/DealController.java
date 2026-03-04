package com.example.myproject.controller;

import com.example.myproject.model.Deal;
import com.example.myproject.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deals")
@CrossOrigin
public class DealController {

    @Autowired
    private DealService service;

    @GetMapping
    public List<Deal> getAll() {
        return service.getAllDeals();
    }

    @GetMapping("/{id}")
    public Deal getById(@PathVariable Long id) {
        return service.getDealById(id);
    }

    @PostMapping
    public Deal create(@RequestBody Deal deal) {
        return service.saveDeal(deal);
    }

    @PutMapping("/{id}")
    public Deal update(@PathVariable Long id, @RequestBody Deal deal) {
        return service.updateDeal(id, deal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteDeal(id);
    }
}