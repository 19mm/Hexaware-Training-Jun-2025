package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Item {
	@Id
	String code;
	String name;
	double price;
	int qty;
	
	Item() {}

	public Item(String code, String name, double price, int qty) {
		super();
		this.code = code;
		this.name = name;
		this.price = price;
		this.qty = qty;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	@Override
	public String toString() {
		return "Item [code=" + code + ", name=" + name + ", price=" + price + ", qty=" + qty + "]";
	}
}
