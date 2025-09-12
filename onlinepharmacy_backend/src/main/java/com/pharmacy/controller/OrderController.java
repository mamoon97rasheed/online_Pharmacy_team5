package com.pharmacy.controller;

import com.pharmacy.model.Order;
import com.pharmacy.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public List<Order> placeOrder(@RequestParam String username) {
        return orderService.placeOrder(username);
    }

    @GetMapping("/user/{username}")
    public List<Order> getOrders(@PathVariable String username) {
        return orderService.getOrdersByUsername(username);
    }
}
