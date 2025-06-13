package Connection;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;

import Model.*;

@SuppressWarnings("unused")
public class StudentConnection {
	private static SessionFactory sf;
	
	StudentConnection(){
		sf= new Configuration().configure("hiber.config.xml").addAnnotatedClass(Student.class).buildSessionFactory();	
	}
	
	public static SessionFactory getSessionFactory() {	
		StudentConnection sconn=new StudentConnection();
		return sf;
	}
	
}
