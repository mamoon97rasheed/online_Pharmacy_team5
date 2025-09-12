package com.pharmacy.controller;

import com.pharmacy.model.Cart;
import com.pharmacy.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add to cart
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestParam String username,
                                       @RequestParam int drugId,
                                       @RequestParam int quantity) {
        Cart cart = cartService.addToCart(username, drugId, quantity);
        if (cart == null) {
            return ResponseEntity.badRequest().body("❌ Invalid username or drugId");
        }
        return ResponseEntity.ok(cart);
    }

    // View cart
    @GetMapping("/view")
    public ResponseEntity<?> viewCart(@RequestParam String username) {
        List<Cart> items = cartService.getCartByUser(username);
        if (items.isEmpty()) {
            return ResponseEntity.ok("Cart is empty or user not found");
        }
        return ResponseEntity.ok(items);
    }

    // Clear cart
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestParam String username) {
        cartService.clearCart(username);
        return ResponseEntity.ok("Cart cleared for user: " + username);
    }
}
