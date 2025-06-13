package Spring_Example.Spring_Example;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.ApplicationContext;

public class App 
{
    @SuppressWarnings("resource")
	public static void main( String[] args )
    {
    	ApplicationContext con = new ClassPathXmlApplicationContext("beans.xml");
    	  
    	  Student s1=(Student)con.getBean("s1");
    	  System.out.println(s1.toString());
    	  
    	  Student s2=(Student)con.getBean("s2");
    	  System.out.println(s2.toString());
    	  
    	  Student s3=(Student)con.getBean("s3");
    	  System.out.println(s3.toString());

    	  Student s4=(Student)con.getBean("s4");
    	  System.out.println(s4.toString());
    	  
    	  Address a=s4.getAddress();
    	  System.out.println(a.toString());
    	  
    }
}
