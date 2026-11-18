package com.eeleksyon.config;

import com.eeleksyon.model.User;
import com.eeleksyon.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        ensureUser(
                "admin@eeleksyon.com",
                "admin123",
                "System Administrator",
                User.Role.ADMIN
        );
        ensureUser(
                "voter@eeleksyon.com",
                "voter123",
                "Demo Voter",
                User.Role.VOTER
        );
    }

    private void ensureUser(String email, String password, String fullName, User.Role role) {
        User user = userRepository.findByEmail(email).orElseGet(User::new);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(role);
        userRepository.save(user);
    }
}
