package com.example.myproject.repository;

import com.example.myproject.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository  extends JpaRepository<Deal,Long> {
}