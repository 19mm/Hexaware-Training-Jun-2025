package DAO;

import java.util.List;
import java.util.Scanner;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import Model.Book;
import Util.HibernateUtil;

@SuppressWarnings({"deprecation","resource","unused"})
public class BookDAO implements BookDAOImpl{
	SessionFactory sf;
	
	public BookDAO(){
		sf=HibernateUtil.getSessionFactory();
		if(sf==null) {
			System.out.println("Unable to connect.");
		}
	}
	
	@Override
	public void addBook(Book b) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		session.save(b);
		tx.commit();
	}

	@Override
	public void updateBook(int bookId) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Book b=session.find(Book.class,bookId);
		if(b==null) {
			System.out.println("No Record Found...");
		}
		else {
			Scanner sc=new Scanner(System.in);
			System.out.println("Enter New Price: ");
			b.setPrice(sc.nextDouble());
			session.update(b);
			tx.commit();
		}
	}

	@Override
	public void removeBook(int bookId) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Book b=session.find(Book.class,bookId);
		if(b==null) {
			System.out.println("No Record Found...");
		}
		else {
			session.delete(b);
			tx.commit();
		}	
	}

	@Override
	public void generateBill(int bookId, int qty) {
		Session session=sf.openSession();
		Transaction tx=session.beginTransaction();
		Book b=session.find(Book.class,bookId);
		if(b==null) {
			System.out.println("No Record Found...");
		}
		else {
			if(b.getQty()>0) {
				double total_amt=b.getPrice()*b.getQty();		
				System.out.println("Bill Detials");
				System.out.println("Book Title: "+b.getTitle());
				System.out.println("Book Price (1 Unit): "+b.getPrice());
				System.out.println("Total Amount: "+total_amt);
			}
			else {
				System.out.println("Insufficent Qty of Books");
			}
		}
	}

	@Override
	public void enquireBook(String title) {
		Session session = sf.openSession();
		Query<Book>q=session.createQuery("from Book where title=:title", Book.class);
		q.setParameter("title", title);
		List<Book> user=q.list();
		for(Book b:user) {
			System.out.println(b.getBookId());
			System.out.println(b.getTitle());
			System.out.println(b.getAuthor());
			System.out.println(b.getPrice());
			System.out.println(b.getQty());
		}		
	}

}
