package com.hibernate.com.hibernate1to1;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Student {
	@Id
	int rollno;
	String name;
	double marks;
	
	@OneToOne(targetEntity = Address.class)
	Address address;
	
	Student(){}

	public Student(int rollno, String name, double marks, Address address) {
		super();
		this.rollno = rollno;
		this.name = name;
		this.marks = marks;
		this.address = address;
	}

	public int getRollno() {
		return rollno;
	}

	public void setRollno(int rollno) {
		this.rollno = rollno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMarks() {
		return marks;
	}

	public void setMarks(double marks) {
		this.marks = marks;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Student [rollno=" + rollno + ", name=" + name + ", marks=" + marks + ", address=" + address + "]";
	}
}
	