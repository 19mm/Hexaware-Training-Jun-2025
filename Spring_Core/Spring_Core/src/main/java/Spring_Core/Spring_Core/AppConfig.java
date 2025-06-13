package Spring_Core.Spring_Core;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class AppConfig {

    @Bean
    public Project project() {
        return new Project(202, "1 year", 120000);
    }

    @Bean(initMethod = "afterPropertiesSet", destroyMethod = "destroy")
    public Employee employee() {
        Map<String, String> address = new HashMap<>();
        address.put("home", "Delhi");
        address.put("office", "Noida");

        Employee emp = new Employee();
        emp.setEmpId(2);
        emp.setName("Bob");
        emp.setSal(90000);
        emp.setAddress(address);
        emp.setProj(project());
        return emp;
    }
}
