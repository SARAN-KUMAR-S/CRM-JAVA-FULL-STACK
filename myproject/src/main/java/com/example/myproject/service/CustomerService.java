package com.example.myproject.service;
import com.example.myproject.model.Customer;
import com.example.myproject.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Customer saveCustomer(Customer customer) {
        return repository.save(customer);
    }

    public Customer updateCustomer(Long id, Customer customer) {
        Optional<Customer> existing = repository.findById(id);
        if (existing.isPresent()) {
            Customer c = existing.get();
            c.setName(customer.getName());
            c.setEmail(customer.getEmail());
            c.setPhone(customer.getPhone());
            c.setCompany(customer.getCompany());
            c.setStatus(customer.getStatus());
            return repository.save(c);
        }
        return null;
    }

    public void deleteCustomer(Long id) {
        repository.deleteById(id);
    }
}
