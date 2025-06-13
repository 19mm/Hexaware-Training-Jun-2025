package com.hibernate.toMany.com.hibernate.toMany;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
 
@Entity
@Table(name = "department")
public class Department {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int dCode;
	
	String dName;
	@OneToMany(targetEntity = Employee.class,cascade =CascadeType.ALL,fetch =FetchType.EAGER )
	 
	
	 List <Employee>emplist;
	
	
	Department()
	{
		
	}
	
 
 
	public Department(int dCode, String dName, List<Employee> emplist) {
		super();
		this.dCode = dCode;
		this.dName = dName;
		this.emplist = emplist;
	}
 
 
 
	public int getdCode() {
		return dCode;
	}
 
 
	public void setdCode(int dCode) {
		this.dCode = dCode;
	}
 
 
	public String getdName() {
		return dName;
	}
 
 
	public void setdName(String dName) {
		this.dName = dName;
	}
 
 
	public List<Employee> getEmplist() {
		return emplist;
	}
 
 
	public void setEmplist(List<Employee> emplist) {
		this.emplist = emplist;
	}
 
 
	@Override
	public String toString() {
		return "Department [dCode=" + dCode + ", dName=" + dName + ", emplist=" + emplist + "]";
	}
	
	
	
	
	
	
	
}