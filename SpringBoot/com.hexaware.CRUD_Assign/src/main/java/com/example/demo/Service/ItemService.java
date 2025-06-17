package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Item;
import com.example.demo.JPARepo.ItemRepo;

@Service
public class ItemService {
	@Autowired
	ItemRepo ir;
	
	public Item Add(Item i) {
		Item item=ir.save(i);
		return item;
	}
	
	public Item getItemByCode(String code) {
		return ir.findById(code).orElse(null);
	}

	public int  UpdatePrice(String code, double price) {
		return ir.update(code,price);
	}
	
	public String BillByCode(String code, int qty) {
		Optional<Item> i=ir.findById(code);
		double total;
		if(i!= null) {
			Item i1=i.get();
			if((i1.getQty()-qty)>10) {
				total=i1.getPrice()*qty;
				System.out.println("Bill Generated:");
				System.out.println("Item Code: "+i1.getCode());
				System.out.println("Item Name:"+i1.getName());
				System.out.println("Item Price: "+i1.getPrice());
				System.out.println("Quantity:"+qty);
				System.out.println("Total Amount: "+total);
			}
			else {
				return "InSufficent Quantity Alert !!";
			}
		}
		else {
			return "No Item Found";
		}
		return "0";
	}
	
}
