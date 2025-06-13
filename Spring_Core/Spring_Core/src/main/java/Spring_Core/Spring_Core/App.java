package Spring_Core.Spring_Core;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        Employee emp = context.getBean("employee", Employee.class);
        System.out.println(emp);
        context.close();
        
        AnnotationConfigApplicationContext context1 = new AnnotationConfigApplicationContext(AppConfig.class);
        Employee emp1 = context1.getBean(Employee.class);
        System.out.println(emp1);
        context1.close();
    }
}
