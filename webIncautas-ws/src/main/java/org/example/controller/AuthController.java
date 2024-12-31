package org.example.controller;

import org.example.Entidades.LoginRequest;
import org.example.Entidades.User;
import org.example.api.UserService;
import org.example.service.JwtResponse;
import org.example.service.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService; // Servicio para manejar usuarios
    private final JwtUtils jwtUtils; // Clase para manejar el token

    public AuthController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @CrossOrigin(origins = "http://localhost:8080") // Permite solicitudes desde este origen
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginDTO) {
        System.out.println("DTO recibido para login: " + loginDTO);

        User user = userService.validateUser(loginDTO.getUsername(), loginDTO.getPassword());
        if (user != null) {
            String token = jwtUtils.generateToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
    }

    @CrossOrigin(origins = "http://localhost:8080") // Permite solicitudes desde este origen
    @GetMapping("/me")
    public ResponseEntity<?> getAuthenticatedUser(@RequestHeader("Authorization") String token) {
        // Verifica que el token comience con "Bearer"
        if (!token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token inválido o malformado");
        }

        // Extraer solo el token sin el prefijo "Bearer"
        token = token.substring(7);

        // Validar el token
        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o expirado");
        }

        // Extraer el username del token
        String username = jwtUtils.getUsernameFromToken(token);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No se pudo obtener el usuario del token");
        }

        // Devuelve el nombre de usuario autenticado en un objeto JSON
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        return ResponseEntity.ok(response);
    }
}
