package org.example.controller;

import org.example.Entidades.Role;
import org.example.Entidades.UserDTO;
import org.example.api.RoleRepository;
import org.example.api.UserRepository;
import org.example.api.UserService;
import org.example.Entidades.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;


    public UserController(UserService userService, PasswordEncoder passwordEncoder, RoleRepository roleRepository, UserRepository userRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{correo}")
    public User getUserByCorreo(@PathVariable String correo) {
        return userService.getUserByCorreo(correo);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        try {
            // Validar datos del usuario
            if (userDTO.getUsername() == null || userDTO.getPassword() == null || userDTO.getCorreo() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Todos los campos (username, password, correo) son obligatorios.");
            }
            // Crear una nueva instancia de User
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setCorreo(userDTO.getCorreo());

            // Codificar la contraseña con el PasswordEncoder inyectado
            String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
            System.out.println("Contraseña original: " + userDTO.getPassword());
            System.out.println("Contraseña codificada: " + encodedPassword);
            user.setPassword(encodedPassword);

            // Verificar si el usuario ya tiene roles asignados
            if (user.getRoles().isEmpty()) {
                // Si no tiene roles, asignar el rol "USER"
                Role userRole = roleRepository.findByName("USER")
                        .orElseThrow(() -> new IllegalArgumentException("El rol USER no está definido"));
                user.setRoles(Collections.singleton(userRole));
            }

            // Guardar el usuario en la base de datos y devolver una respuesta exitosa
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {
            // En caso de error, devolver una respuesta con un mensaje descriptivo
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear el usuario: " + e.getMessage());
        }
    }

    @DeleteMapping("/{correo}")
    public ResponseEntity<?> deleteUser(@PathVariable String correo) {
        try {
            userService.deleteUser(correo);
            return ResponseEntity.ok("Usuario eliminado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar el usuario");
        }
    }

    @GetMapping("/{id}/roles")
    public ResponseEntity<?> getUserRoles(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Set<Role> roles = user.getRoles(); // Recupera los roles asociados
        return ResponseEntity.ok(roles);
    }

    @PutMapping("/{id}/add-role")
    public ResponseEntity<?> addRoleToUser(@PathVariable Long id, @RequestBody String roleName) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Role newRole = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));

        Set<Role> roles = user.getRoles(); // Recupera los roles actuales
        roles.add(newRole); // Agrega el nuevo rol
        user.setRoles(roles); // Actualiza los roles del usuario

        User updatedUser = userRepository.save(user); // Guarda los cambios
        return ResponseEntity.ok(updatedUser);
    }
}

