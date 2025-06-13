package com.hibernate.com.hibernate1to1;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class App 
{
    @SuppressWarnings("deprecation")
	public static void main(String[] args)
    {
    	SessionFactory sf= new Configuration().
    	configure("hiber.config.xml").
    	addAnnotatedClass(Student.class).
    	addAnnotatedClass(Address.class).
    	buildSessionFactory();
    	
    	Session s=sf.openSession();
    	Transaction t=s.beginTransaction();
    	
    	Address a1=new Address();
    	a1.setAddressid(1);
    	a1.setCity("Ahmednagar");
    	
    	Student s1=new Student();
    	s1.setRollno(101);
        s1.setName("Ajay");
        s1.setMarks(150.0);
        s1.setAddress(a1);
        
        s.save(s1);
        s.save(a1);
        t.commit();
    	
    }
}
