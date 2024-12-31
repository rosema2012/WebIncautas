package org.example.Entidades;

import java.util.Set;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String username;
    private String correo;
    private Set<String> roles;
    private String password;


    public UserDTO() {
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.correo = user.getCorreo();
        this.roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
