package org.example.service;

import org.example.Entidades.Role;
import org.example.Entidades.User;
import org.example.api.RoleRepository;
import org.example.api.UserRepository;
import org.example.api.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository; // Inyectamos el RoleRepository

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public User validateUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("Contraseña codificada en DB: " + user.getPassword());
            System.out.println("Contraseña ingresada: " + password);
            System.out.println("Coincidencia: " + passwordEncoder.matches(password, user.getPassword()));

            if (passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User authenticate(String usernameOrCorreo, String password) {
        // Aquí puedes reutilizar validateUser o implementar una lógica similar para username o correo
        User user = userRepository.findByUsernameOrCorreo(usernameOrCorreo, usernameOrCorreo);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    @Override
    public Optional<User> getUserDetails(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByUsername(String username) {
        return null;
    }

    @Override
    public List<String> getRolesForUser(Long userId) {
        // Implementa esta lógica según tu modelo de roles
        return null;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }

    @Override
    public User createUser(User user) {
        // Codificar la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Asignar rol al usuario
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalArgumentException("El rol USER no está definido en la base de datos"));
        user.setRoles(Collections.singleton(userRole));

        return userRepository.save(user);
    }


    @Override
    public void deleteUser(String correo) {
        User user = userRepository.findByCorreo(correo);
        if (user != null) {
            userRepository.delete(user);
        }
    }
}
