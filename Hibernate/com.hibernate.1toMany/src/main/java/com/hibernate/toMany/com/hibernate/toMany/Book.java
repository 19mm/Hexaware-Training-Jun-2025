package com.hibernate.toMany.com.hibernate.toMany;

import jakarta.persistence.*;

@Entity
@Table(name = "book")
public class Book {
    @Id
    public int bookId;
    public String title;
    public String author;

    public Book() {}

    public Book(int bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	@Override
	public String toString() {
		return "Book [bookId=" + bookId + ", title=" + title + ", author=" + author + "]";
	}
	
	
}
