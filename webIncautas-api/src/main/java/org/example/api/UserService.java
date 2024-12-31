package org.example.api;

import org.example.Entidades.User;

import java.util.List;
import java.util.Optional;

// UserService.java
public interface UserService {
    List<String> getRolesForUser(Long userId);
    List<User> getAllUsers();
    User getUserByCorreo(String correo);
    User createUser(User user);
    void deleteUser(String correo);

    User validateUser(String username, String password);

    User authenticate(String usernameOrCorreo, String password);
    Optional<User> getUserDetails(String username);

    User findByUsername(String username);
}
