package com.odontologia.Vitaldent_PPI.infrastructure;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.odontologia.Vitaldent_PPI.application.adapters.persistence.sql.repositories")
public class PersistenceConfig {
}