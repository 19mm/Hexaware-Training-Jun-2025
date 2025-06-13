package com.hibernate.toMany.com.hibernate.toMany;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "library")
public class Library {
    @Id
    public int libId;
    public String name;
    public String location;

    @OneToMany(targetEntity = Book.class, cascade = CascadeType.ALL)
    public List<Book> books;

    public Library() {}

    public Library(int libId, String name, String location, List<Book> books) {
        this.libId = libId;
        this.name = name;
        this.location = location;
        this.books = books;
    }

	public int getLibId() {
		return libId;
	}

	public void setLibId(int libId) {
		this.libId = libId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	@Override
	public String toString() {
		return "Library [libId=" + libId + ", name=" + name + ", location=" + location + ", books=" + books + "]";
	}
}
