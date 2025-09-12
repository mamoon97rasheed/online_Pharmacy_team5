package com.pharmacy.controller;

import com.pharmacy.model.Drug;
import com.pharmacy.model.User;
import com.pharmacy.repository.UserRepository;
import com.pharmacy.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drugs")
public class DrugController {

    @Autowired
    private DrugService drugService;

    @Autowired
    private UserRepository userRepository;

    // ✅ Role check endpoint
    @GetMapping("/check-role")
    public String checkRole(@RequestParam String username) {
        System.out.println("Looking for username: " + username);

        // Print all users in the DB for debugging
        userRepository.findAll().forEach(user -> {
            System.out.println("DB User -> ID: " + user.getUserId()
                    + ", Username: '" + user.getUsername()
                    + "', Role: " + user.getRole());
        });

        User u = userRepository.findByUsername(username);
        if (u != null) {
            return "Login successful as " + u.getRole();
        } else {
            return "User not found";
        }
    }

    // ✅ Add drug - Only admin
    @PostMapping
    public Object addDrug(@RequestParam String adminUsername, @RequestBody Drug drug) {
        User u = userRepository.findByUsername(adminUsername);
        if (u == null || !"ADMIN".equalsIgnoreCase(u.getRole())) {
            return "Only admin can add drugs";
        }
        return drugService.addDrug(drug);
    }

    // ✅ Update drug - Only admin
    @PutMapping("/{id}")
    public Object updateDrug(@RequestParam String adminUsername, @PathVariable int id, @RequestBody Drug dto) {
        User u = userRepository.findByUsername(adminUsername);
        if (u == null || !"ADMIN".equalsIgnoreCase(u.getRole())) {
            return "Only admin can update drugs";
        }
        Drug updated = drugService.updateDrug(id, dto);
        if (updated == null) return "Drug not found";
        return updated;
    }

    // ✅ Delete drug - Only admin
    @DeleteMapping("/{id}")
    public Object deleteDrug(@RequestParam String adminUsername, @PathVariable int id) {
        User u = userRepository.findByUsername(adminUsername);
        if (u == null || !"ADMIN".equalsIgnoreCase(u.getRole())) {
            return "Only admin can delete drugs";
        }
        return drugService.deleteDrug(id);
    }

    // ✅ View all drugs
    @GetMapping
    public List<Drug> getAllDrugs() {
        return drugService.getAllDrugs();
    }
}
