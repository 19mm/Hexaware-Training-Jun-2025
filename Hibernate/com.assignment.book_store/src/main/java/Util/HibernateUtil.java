package Util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import Model.Book;

@SuppressWarnings("unused")
public class HibernateUtil {
	private static SessionFactory sf;
	
	HibernateUtil(){
		sf=new Configuration().configure("hiber.config.xml").addAnnotatedClass(Book.class).buildSessionFactory();
	}
	
	public static SessionFactory getSessionFactory() {	
		HibernateUtil sconn=new HibernateUtil();
		return sf;
	}
}
