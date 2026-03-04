package com.example.myproject.service;

import java.util.List;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.myproject.model.Order;
import com.example.myproject.model.OrderItem;
import com.example.myproject.model.Product;
import com.example.myproject.repository.OrderRepository;
import com.example.myproject.repository.OrderItemRepository;
import com.example.myproject.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        
        // Calculate total and update stock
        double total = 0.0;
        for (OrderItem item : order.getOrderItems()) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null && product.getStock() >= item.getQuantity()) {
                item.setPrice(product.getPrice());
                item.setProductName(product.getName());
                item.setSubtotal(product.getPrice() * item.getQuantity());
                item.setOrder(order);
                total += item.getSubtotal();
                
                // Update stock
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            }
        }
        order.setTotalAmount(total);
        
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Order> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }
}
