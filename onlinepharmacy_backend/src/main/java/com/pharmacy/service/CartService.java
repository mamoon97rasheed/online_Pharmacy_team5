package com.pharmacy.service;

import com.pharmacy.model.Cart;
import com.pharmacy.model.Drug;
import com.pharmacy.model.User;
import com.pharmacy.repository.CartRepository;
import com.pharmacy.repository.DrugRepository;
import com.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private DrugRepository drugRepo;

    // ✅ Add to cart
    public Cart addToCart(String username, int drugId, int quantity) {
        User user = userRepo.findByUsername(username);   // now plain User
        Optional<Drug> optionalDrug = drugRepo.findById(drugId);

        if (user == null || optionalDrug.isEmpty()) {
            return null; // Username or drug ID invalid
        }

        Drug drug = optionalDrug.get();

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setDrug(drug);
        cart.setQuantity(quantity);

        return cartRepo.save(cart);
    }

    // ✅ Get cart items by user
    public List<Cart> getCartByUser(String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            return List.of();
        }
        return cartRepo.findByUser(user);
    }

    // ✅ Clear cart by user
    public void clearCart(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            List<Cart> items = cartRepo.findByUser(user);
            cartRepo.deleteAll(items);
        }
    }
}
