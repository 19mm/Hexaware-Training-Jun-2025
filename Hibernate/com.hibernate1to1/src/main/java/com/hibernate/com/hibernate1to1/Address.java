package com.hibernate.com.hibernate1to1;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
 
@Entity
public class Address {
   
	@Id
	int addressid;
	String city;
	
	Address() {}
	
	public Address(int addressid, String city) {
		super();
		this.addressid = addressid;
		this.city = city;
	}
 
	public int getAddressid() {
		return addressid;
	}
 
	public void setAddressid(int addressid) {
		this.addressid = addressid;
	}
 
	public String getCity() {
		return city;
	}
 
	public void setCity(String city) {
		this.city = city;
	}

	@Override
	public String toString() {
		return "Address [addressid=" + addressid + ", city=" + city + "]";
	}	
}