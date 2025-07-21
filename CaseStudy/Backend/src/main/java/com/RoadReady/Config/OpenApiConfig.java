package com.RoadReady.Config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI roadReadyOpenAPI() {
        
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER)
                .name("Authorization")
                .description("JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"");
        

        
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("BearerAuth");

        return new OpenAPI()
                .info(new Info().title("RoadReady Car Rental API")
                        .description("API documentation for the RoadReady Car Rental application.")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                         .description("RoadReady GitHub Repository")
                         .url("https://github.com/your-repo-link"))
                
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("BearerAuth", securityScheme))
                .addSecurityItem(securityRequirement);
                
    }
}