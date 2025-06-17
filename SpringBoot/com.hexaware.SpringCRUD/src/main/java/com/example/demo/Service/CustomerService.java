package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Customer;
import com.example.demo.JPARepo.CustomerRepo;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
public class CustomerService {

	@Autowired
	CustomerRepo cr;
	
	public Customer DsaveData(Customer c) {
		Customer c1=cr.save(c);
		return c1;
	}
	
	//using JPQL
	public List<Customer> getDataByJPQL(){
		List l=cr.getAllCustomer();
		return(l);
	}
	
	//without using JPQL
	public List<Customer> getData1(){
		List l=cr.findAll();
		return(l);
	}
	
	//using JPQL
	public Customer getByAcnoJPQL(int actno) {
		return cr.findActnoByJPQL(actno);
	}
	
	//without using JPQL
	public Customer getByAcno(int actno) {
		return cr.findById(actno).orElse(null);
	}
	
	//using JPQL
	public Customer getByNameJPQL(String name) {
		return cr.findNameByJPQL(name);
	}
		
	public void removeByAcno(int actno) {
	    cr.deleteById(actno);
	}
	
	public int updateBalD(int actno, double bal) {
		return cr.deposit(actno, bal);
	}
	
	public int updateBalW(int actno, double bal) {
		Customer cust = cr.findById(actno).orElse(null);
		double rem_bal = cust.getBal()-bal;
		
		if(rem_bal > 1000 ) {
			return cr.Withdraw(actno,bal);
		}
		else {
			return 0;
		}
	}

	public int deleteIdByJPQL(int actno) {
		return cr.delete(actno);
	}

	
	
}
