package Hibernate.Hibernate_Example;

import org.hibernate.Session;
import org.hibernate.cfg.Configuration;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

@SuppressWarnings({ "unused", "deprecation" })
public class App
    {
    	SessionFactory  sessionFactory;  // interface
    	Session  session;
    	public App() 
    	{
    		sessionFactory= new Configuration().configure("hiber.config.xml").addAnnotatedClass(Student.class).buildSessionFactory();
        	session=sessionFactory.openSession();
    	}
    	void insert(int rno, String sname, double marks)
    	{
        	Transaction txTransaction= session.beginTransaction();
        	Student s= new Student();
        	s.setRollno(rno);
        	s.setName(sname);
        	s.setMarks(marks);
        	session.save(s);
        	txTransaction.commit();
    	}
    	
    	void search(int rollno)
    	{
	    	session=sessionFactory.openSession();
	        Student rs=	session.get(Student.class, rollno);
	        if(rs!=null)
	        {
	        	System.out.println(rs.toString());
	        }
	        else {
	        	System.out.println("Not Found");
	     	}
    	}
    	
    	void searchByName(String name) {
    		session=sessionFactory.openSession();
    		Student rs=session.find(Student.class, name);
    		if(rs!=null) {
    			System.out.println(rs.toString());
    		}
    		else {
	        	System.out.println("Not Found");
	     	}
    	}
    	
    	void removeByRollNo(int rno)
    	{
    		session=sessionFactory.openSession();
        	Transaction txTransaction= session.beginTransaction();
        	Student r=session.find(Student.class, rno);
        	if(r==null)
        	{
        		System.out.println("Not Found");
        	}
        	else {
        	session.delete(r);
        	}
        	txTransaction.commit();
    	}
    	
    	void updateNameFee(int roll,double marks,String name)
    	{
    		
    		session=sessionFactory.openSession();
        	Transaction txTransaction= session.beginTransaction();
        	Student s= new Student();
        	s.setRollno(roll);
        	s.setName(name);
        	s.setMarks(marks);
        	session.update(s);
        	txTransaction.commit();
     	}
    	
    	void update(int rollno, double marks, String name)
    	{
    		session=sessionFactory.openSession();
        	Transaction txTransaction= session.beginTransaction();
        	Student r=session.find(Student.class, rollno);
        	if(r!=null) {
        		r.setRollno(rollno);
            	r.setName(name);
            	r.setMarks(marks);
            	session.update(r);
            	txTransaction.commit();
        	}
        	else {
        		System.out.println("No Record Found....");
        	}
        	
    	}
        public static void main( String[] args )
        {
        	App obj= new App();   
        	/*obj.insert(101,"Mayuresh",995.5);
        	obj.insert(102,"Firodiya",990.0);
        	obj.insert(103,"Parth",1000.0);
        	obj.insert(104,"Sapkal",999.9);
        	obj.insert(105,"Namir",999.9);
        	obj.insert(107,"Khan",999.9);*/
        	
        	obj.search(101);
        	
        	//obj.searchByName("Mayuresh");
        	
        	obj.removeByRollNo(101);
        	
        	obj.updateNameFee(102, 1000.0, "Firodiya");
        	
        	obj.update(102, 789, "Mayuresh");
            System.out.println( "Hello World!" );
        }
    }
    /*public static void main( String[] args )
    {
    	SessionFactory sessionFactory;
    	Session session;
    	sessionFactory=new Configuration().configure("hiber.config.xml").addAnnotatedClass(Student.class).buildSessionFactory();
    	session=sessionFactory.openSession();
    	Transaction txTransaction=session.beginTransaction();
    	Student s=new Student();
    	s.setRollno(1);
    	s.setName("Mayuresh");
    	s.setMarks(1000.0);
    	session.save(s);
    	txTransaction.commit();
    	System.out.println( "Hello World!" );
    }*/
