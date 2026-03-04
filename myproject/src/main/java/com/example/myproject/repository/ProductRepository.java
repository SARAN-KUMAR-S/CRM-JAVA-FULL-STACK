package com.example.myproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.myproject.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
