package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Item;
import com.example.demo.JPARepo.ItemRepo;
import com.example.demo.Service.ItemService;

@RestController
public class ControllerService {
	@Autowired
	ItemService s;
	@Autowired
	ItemRepo ir;
	
	@PostMapping("/AddItem")
	public Item addItem(@RequestBody Item i) {
		Item additem=s.Add(i);
		return additem;
	}
	
	@GetMapping("/GetItem/{code}")
	public Item getItem(@PathVariable String code) {
		return s.getItemByCode(code);
		
	}
	
	@PutMapping("/UpdateItem/{code}/{price}")
	public int updateItem(@PathVariable String code, @PathVariable double price) {
		return s.UpdatePrice(code,price);
	}
	
	@GetMapping("/GenBill/{code}/{qty}")
	public String GenBill(@PathVariable String code,@PathVariable int qty) {
		 return s.BillByCode(code,qty);
	}
}
