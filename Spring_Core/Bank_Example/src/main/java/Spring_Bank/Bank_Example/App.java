package Spring_Bank.Bank_Example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App 
{
    @SuppressWarnings("resource")
	public static void main( String[] args )
    {
      ApplicationContext con = new ClassPathXmlApplicationContext("beans.xml");
  	  
  	  Customer c1=(Customer)con.getBean("c1");
  	  System.out.println(c1.toString());
  	  
  	  Customer c2=(Customer)con.getBean("c2");
  	  System.out.println(c2.toString());
  	  
  	  Customer c3=(Customer)con.getBean("c3");
  	  System.out.println(c3.toString());
  	  
  	  Customer c4=(Customer)con.getBean("c4");
	  System.out.println(c4.toString());
	  Loan l=c4.getLoan();
	  System.out.println(l.toString());
    }
}
