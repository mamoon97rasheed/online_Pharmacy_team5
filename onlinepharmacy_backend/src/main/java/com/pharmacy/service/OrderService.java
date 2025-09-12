package com.pharmacy.service;

import com.pharmacy.model.Cart;
import com.pharmacy.model.Order;
import com.pharmacy.model.User;
import com.pharmacy.repository.CartRepository;
import com.pharmacy.repository.OrderRepository;
import com.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

    public List<Order> placeOrder(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) return List.of();

        List<Cart> cartItems = cartRepo.findByUser(user);
        List<Order> orders = new ArrayList<>();

        for (Cart cart : cartItems) {
            Order order = new Order();
            order.setUser(user);
            order.setDrug(cart.getDrug());
            order.setQuantity(cart.getQuantity());
            order.setTotalPrice(cart.getQuantity() * cart.getDrug().getPrice());
            orders.add(order);
        }

        cartRepo.deleteAll(cartItems);
        return orderRepo.saveAll(orders);
    }

    public List<Order> getOrdersByUsername(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) return List.of();
        return orderRepo.findByUser(user);
    }

}
