package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(scanBasePackages = {"org.example"})
@ComponentScan(basePackages = {
        "org.example.Entidades",
        "org.example.api",
        "org.example.dao",
        "org.example.controller",
        "org.example.service",
        "org.example"// o "org.example.service"
})
@EnableJpaRepositories(basePackages = "org.example.api") // Paquete de repositorios
@EntityScan(basePackages = "org.example.Entidades")      // Paquete de entidades
public class WebIncautasApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebIncautasApplication.class, args);

    }
}
