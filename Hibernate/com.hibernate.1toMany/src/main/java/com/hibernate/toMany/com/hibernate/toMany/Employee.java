package com.hibernate.toMany.com.hibernate.toMany;

import jakarta.persistence.Id;
import jakarta.persistence.Entity;

@Entity
public class Employee {
	
	@Id
	
	int emp_id;
	String name;
	Double salary;
	
	Employee()
	{
		
	}
 
	
	
	public Employee(int emp_id, String name, Double salary) {
		super();
		this.emp_id = emp_id;
		this.name = name;
		this.salary = salary;
	}
 
 
 
	public int getEmp_id() {
		return emp_id;
	}
 
	public void setEmp_id(int emp_id) {
		this.emp_id = emp_id;
	}
 
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public Double getSalary() {
		return salary;
	}
 
	public void setSalary(Double salary) {
		this.salary = salary;
	}
 
 
 
	@Override
	public String toString() {
		return "Employee [emp_id=" + emp_id + ", name=" + name + ", salary=" + salary + "]";
	}
}