package com.hibernate.toMany.com.hibernate.toMany;
    	 
    	/*import java.util.ArrayList;
    	import java.util.List;
    	 
    	import org.hibernate.Session;
    	import org.hibernate.SessionFactory;
    	import org.hibernate.Transaction;
    	import org.hibernate.cfg.Configuration;
    	 
    	public class App 
    	{
    	    public static void main( String[] args )
    	    {
    	   SessionFactory sessionFactory= new Configuration().
    			   configure("hiber.config.xml").
    			   addAnnotatedClass(Employee.class).
    			   addAnnotatedClass(Department.class).
    			   buildSessionFactory();

    	          Session session =sessionFactory.openSession();
    	          Transaction txt =session.beginTransaction();

    	           Employee e1= new Employee(101,"asha",3000.0);
    	           Employee e2= new Employee(102,"jay",7000.0);
    	 
    	          
    	          List<Employee> list= new ArrayList();
    	          list.add(e1);
    	          list.add(e2);

    	          Department ojbD= new Department();
    	          ojbD.setdCode(1);
    	          ojbD.setdName("Admin");
    	          ojbD.setEmplist(list);

    	          session.save(ojbD);
    	          txt.commit();

    	         /* Address a1= new Address();
    	          a1.setAddressid(4);
    	          a1.setCity("delhi");
    	          //session.save(a1);
    	          Student s1 = new Student();
    	          s1.setRollno(106);
    	          s1.setName("jatin");
    	          s1.setAddress(a1);

    	          session.save(s1);
    	          txt.commit();
    	    }	
    }
*/
import java.util.ArrayList;
import java.util.List;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
 
 
 
/**
* Hello world!
*
*/
public class App 
{
    public static void main( String[] args )
    {
   SessionFactory sessionFactory= new Configuration().
		   configure("hiber.config.xml").
		   addAnnotatedClass(Employee.class).
		   addAnnotatedClass(Department.class).
		   buildSessionFactory();

          Session session =sessionFactory.openSession();


          Department  d= session.get(Department.class, 1);

          System.out.print( d.getdName());
          /* Employee e1= new Employee(101,"asha",3000.0);
           Employee e2= new Employee(102,"jay",7000.0);
          List<Employee> list= new ArrayList();
          list.add(e1);
          list.add(e2);

          Department ojbD= new Department();
          ojbD.setdCode(1);
          ojbD.setdName("Admin");
          ojbD.setEmplist(list);

          session.save(ojbD);
          txt.commit();

         /* Address a1= new Address();
          a1.setAddressid(4);
          a1.setCity("delhi");
          //session.save(a1);
          Student s1 = new Student();
          s1.setRollno(106);
          s1.setName("jatin");
          s1.setAddress(a1);

          session.save(s1);
          txt.commit();

   */



 
    }
}