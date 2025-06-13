package com.assignment.book_store.com.assignment.book_store;

import java.util.Scanner;

import Service.BookService;

public class App 
{
    @SuppressWarnings("resource")
	public static void main(String[] args)
    {
    	BookService bs=new BookService();
        Scanner sc=new Scanner(System.in);
        int ch;
        do {
    	System.out.println( "Welcome to Book Store !!" );
        System.out.println( "Below are the wide variety of Services we offer...." );
        System.out.println("1. Add a New Book");
        System.out.println("2. Update a Book's Price	");
        System.out.println("3. Rmove a Book");
        System.out.println("4. Generate Bill");
        System.out.println("5. Enquire about a book");
        System.out.println("6. Exit");
        System.out.println("Enter you choice: ");
        ch=sc.nextInt();
        switch(ch) {
        case 1:bs.addBook(); break;
        case 2:bs.updateBook();break;
        case 3:bs.removeBook();break;
        case 4:bs.generateBill();break;
        case 5:bs.enquireBook();break;
        default:System.out.println("Enter valid choice from available menu....");break;
        }
        }while(ch>0 && ch<=5);
    }
}
