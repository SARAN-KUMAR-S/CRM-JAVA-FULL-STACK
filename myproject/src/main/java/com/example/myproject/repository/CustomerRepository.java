package com.example.myproject.repository;
import com.example.myproject.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  CustomerRepository extends JpaRepository<Customer,Long> {
}