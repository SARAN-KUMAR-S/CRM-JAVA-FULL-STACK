package com.example.myproject.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "deals")
@Getter
@Setter
@NoArgsConstructor
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Double amount;

    private String stage;




    public Deal(String title, Double amount, String stage) {
        this.title = title;
        this.amount = amount;
        this.stage = stage;
    }
}