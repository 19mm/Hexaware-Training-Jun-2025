package com.Book.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Book.Entity.*;
import com.Book.Repository.*;

@Service
public class BookService {
	
	@Autowired
    BookRepo br;
	
	public List<Book> getAllBooks() {
	        return br.findAll();
	    }

	public Book getBookByIsbn(String isbn) {
        Optional<Book> book = br.findById(isbn);
        return book.orElse(null);
    }
	
	public Book createBook(Book book) {
       return br.save(book);
    }
	
	public Book updateBook(String isbn, Book bookDetails) {
        Book existingBook = getBookByIsbn(isbn);
        if (existingBook != null) {
            existingBook.setTitle(bookDetails.getTitle());
            existingBook.setAuthor(bookDetails.getAuthor());
            existingBook.setPublication_Year(bookDetails.getPublication_Year());
            return br.save(existingBook);
        }
        return null;
    }

	public void deleteBook(String isbn) {
        br.deleteById(isbn);
    }

}
