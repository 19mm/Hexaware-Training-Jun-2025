package DAO;

import Model.Book;

public interface BookDAOImpl {
	void addBook(Book b);
	void updateBook(int bookId);
	void removeBook(int bookId);
	void generateBill(int bookId,int qty);
	void enquireBook(String title);
}
