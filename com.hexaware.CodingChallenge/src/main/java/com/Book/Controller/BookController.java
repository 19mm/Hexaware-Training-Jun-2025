package com.Book.Controller;

import com.Book.Entity.*;
import com.Book.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/books") 
public class BookController {
    
    @Autowired
    BookService bs;
   
    @GetMapping 
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bs.getAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable String isbn) {
        Book book = bs.getBookByIsbn(isbn);
        if (book != null) {
            return new ResponseEntity<>(book, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping 
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book createdBook = bs.createBook(book);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    @PutMapping("/{isbn}") 
    public ResponseEntity<Book> updateBook(@PathVariable String isbn, @RequestBody Book bookDetails) {
        Book updatedBook = bs.updateBook(isbn, bookDetails);
        if (updatedBook != null) {
            return new ResponseEntity<>(updatedBook, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{isbn}") 
    public ResponseEntity<Void> deleteBook(@PathVariable String isbn) {
        bs.deleteBook(isbn);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
