package DAO;

import java.util.List;
import java.util.Scanner;

import org.hibernate.*;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;

import Connection.StudentConnection;
import Model.Student;


@SuppressWarnings({ "deprecation", "unused","unchecked" })
public class StudentDAO implements DAOStudentImpl {

	SessionFactory sf;
	
	public StudentDAO(){
		sf=StudentConnection.getSessionFactory();
		if(sf==null) {
			System.out.println("Unable to connect.");
		}
	}
	
	@Override
	public void saveData(Student s) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		session.save(s);
		tx.commit();
	}

	public void removeStudent(int rno) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Student s=session.find(Student.class,rno);
		if(s==null) {
			System.out.println("No Record Found...");
		}
		else {
			session.delete(s);
			tx.commit();
		}
	}

	public void updateStudent(int rno) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Student s=session.find(Student.class,rno);
		if(s==null) {
			System.out.println("No Record Found...");
		}
		else {
			@SuppressWarnings("resource")
			Scanner sc=new Scanner(System.in);
			System.out.println("Enter New Name: ");
			sc.nextLine();
			s.setName(sc.nextLine());
			System.out.println("Enter New Marks: ");
			s.setMarks(sc.nextDouble());
			
			session.update(s);
			tx.commit();
		}
	}
	
	public void searchByRno(int rno) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Student s=session.find(Student.class, rno);
		if(s!=null) {
			System.out.println(s.toString());
		}
		else {
        	System.out.println("Not Found");
     	}
	}
	
	public void ShowData() {
		Session session=sf.openSession();
		/*NativeQuery<Student> query=session.createNativeQuery("select * from Student", Student.class);*/
		Query<Student> query=session.createNamedQuery("Student.findAll", Student.class);
		List<Student> usersList=query.list();
		List<Student> students=	 query.list();
		for(Student s : students )	
		{
			System.out.println(s.toString());	
		}
		/*
		Session session = sf.openSession();
		Query<Student> query = session.createQuery("from Student");
		List<Student> students = query.list();
		for (Student student : students) {
			System.out.println(student.toString());
		}*/
	}

	@Override
	public void searchByName(String name) {
		Session session=sf.openSession();
		Transaction txt=session.beginTransaction();
		/*NativeQuery<Student> q=session.createNativeQuery("select * from student where name=:name", Student.class);*/
		Query<Student> q=session.createNamedQuery("Student.searchByName", Student.class);
		q.setParameter("name", name);
		List<Student> user=q.list();
		for(Student s:user) {
			System.out.println(s.toString());
		}
		/*Session session = sf.openSession();
		Query<Student>q=session.createQuery("from Student where name=:name", Student.class);
		q.setParameter("name", name);
		List<Student> user=q.list();
		for(Student s:user) {
			System.out.println(s.toString());
		}*/
	}
	
	@Override
	public void serachHQLNamMarkse(String name,double marks) {	
		Session session=sf.openSession();
		Transaction txt=session.beginTransaction();
		NativeQuery<Student> q=session.createNativeQuery("select * from student where name=:name and marks=:marks", Student.class);
		q.setParameter("name", name);
		q.setParameter("marks", marks);
		List<Student> user=q.list();
		for(Student s:user) {
			System.out.println(s.toString());
		}
		/*Session session=sf.openSession();
	 	Query <Student>Q=session.createQuery("from Student where name=:name and marks=:marks",Student.class);
		Q.setParameter("name", name);
		Q.setParameter("marks", marks);
		List<Student> usersList=  Q.list();
		for(Student  u : usersList ){
			System.out.println(u.toString());
		}*/
	}
	
	@Override
	public void searchByMarks(double marks) {
		Session session=sf.openSession();
		Transaction txt=session.beginTransaction();
		NativeQuery<Student> q=session.createNativeQuery("select * from student where marks=:marks", Student.class);
		q.setParameter("marks", marks);
		List<Student> user=q.list();
		for(Student s:user) {
			System.out.println(s.toString());
		}
		/*Session session = sf.openSession();
		Query<Student>q = session.createQuery("from Student where marks >: marks",Student.class);
		q.setParameter("marks", marks);
		List<Student>l = q.list();
		l.stream().forEach((i)->System.out.println(i.toString()));*/
	}
	
	public void removeByRollNo(int rno)
	{
		Session session=sf.openSession();
		Transaction txt=session.beginTransaction();
		/*NativeQuery<Student> q=session.createNativeQuery("delete from student where rollno=:rollno", Student.class);*/
		Query <Student>q=session.createNamedQuery("Student.removeByRoll");
		q.setParameter("rno", rno);
		int r=q.executeUpdate();
		if(r>0){
			System.out.println("Removed");
		}
		else
		{
			System.out.println("Not Found");
 		}
		txt.commit();
		
		/*Session session=sf.openSession();
		Transaction txTransaction=session.beginTransaction();
		Query <Student>Q=session.createQuery(" delete from Student where rno=:rno");
		Q.setParameter("rno", rno);
		int r=Q.executeUpdate();
		if(r>0){
			System.out.println("Removed");
		}
		else{
				System.out.println("Not Found");
			}*/
	}
	
	@Override
	public void updateByQuery(int rno, String name, double marks) {
		Session session=sf.openSession();
		Transaction txt=session.beginTransaction();
		NativeQuery<Student> q=session.createNativeQuery("update Student set name=:name, marks=:marks where rno=:rno", Student.class);
		q.setParameter("name", name);
		q.setParameter("marks", marks);
		q.setParameter("rno", rno);
		int r=q.executeUpdate();
		if(r>0){
			System.out.println("Updated");
		}
		else
		{
			System.out.println("Not Found");
 		}
		txt.commit();
		/*Session session = sf.openSession();
		Transaction txt = session.beginTransaction();
		Query<Student> q = session.createQuery("update Student set name=:name, marks=:marks where rno=:rno");
		q.setParameter("name", name);
		q.setParameter("marks", marks);
		q.setParameter("rno", rno);
		int status = q.executeUpdate();
		txt.commit();
		if (status > 0) {
			System.out.println();
		}*/
	}
}