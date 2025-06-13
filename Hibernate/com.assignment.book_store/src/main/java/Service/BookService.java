package Service;
import Model.*;
import DAO.*;
import java.util.*;

public class BookService {
	Book b;
	BookDAO dao;
	Scanner sc;
	
	public BookService() {
		sc=new Scanner(System.in);
		b=new Book();
		dao=new BookDAO();
	}
	
	public void addBook(){
		System.out.println("Enter Book Id: ");
		b.setBookId(sc.nextInt());
		System.out.println("Enter Book Title: ");
		sc.nextLine();
		b.setTitle(sc.nextLine());
		System.out.println("Enter Book Author: ");
		b.setAuthor(sc.nextLine());
		System.out.println("Enter Book Price: ");
		b.setPrice(sc.nextDouble());
		System.out.println("Enter Book Quantity: ");
		b.setQty(sc.nextInt());
		
		dao.addBook(b);
	}
	
	public void updateBook(){
		System.out.println("Enter Book Id: ");
		b.setBookId(sc.nextInt());
		
		dao.updateBook(b.getBookId());
	}
	
	public void removeBook(){
		System.out.println("Enter Book Id: ");
		b.setBookId(sc.nextInt());
		
		dao.removeBook(b.getBookId());
	}
	
	public void generateBill(){
		System.out.println("Enter Book Id: ");
		b.setBookId(sc.nextInt());
		System.out.println("Enter Book Quantity: ");
		b.setQty(sc.nextInt());
		
		dao.generateBill(b.getBookId(),b.getQty());
	}
	
	public void enquireBook(){
		System.out.println("Enter Book Title: ");
		b.setTitle(sc.nextLine());
		
		dao.enquireBook(b.getTitle());
	}
}
