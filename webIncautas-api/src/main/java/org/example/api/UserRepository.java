package org.example.api;

import org.example.Entidades.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        User findByCorreo(String correo);
        User findByUsernameOrCorreo(String username, String correo);
        Optional<User> findByUsername(String username);
}