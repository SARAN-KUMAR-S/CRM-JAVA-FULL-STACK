package com.example.myproject.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String email;
    private String phone;
    private String company;

    private String status;
    public Customer(String name, String email, String phone, String company, String status) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.status = status;
    }

}