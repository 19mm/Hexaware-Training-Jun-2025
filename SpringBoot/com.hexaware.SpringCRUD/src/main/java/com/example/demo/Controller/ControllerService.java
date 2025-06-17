package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Customer;
import com.example.demo.JPARepo.CustomerRepo;
import com.example.demo.Service.CustomerService;
import org.springframework.web.bind.annotation.PutMapping;


@SuppressWarnings({ "unchecked", "rawtypes" })
@RestController
public class ControllerService {
	@Autowired
	CustomerService cs;
	@Autowired
	CustomerRepo cr;
	
	@PostMapping("/saveData")
		public Customer saveData(@RequestBody Customer c) {
			Customer c1=cs.DsaveData(c);
			return c1;
	}
	
	
	@GetMapping("/getUsers")
    public List<Customer> getData()
    {
		List l1=cs.getData1();
		return l1;	
    }

	@GetMapping("/getUsersByJPQL")
    public List<Customer> getUsersByJPQL()
    {
		List l1=cs.getDataByJPQL();
		return l1;	
    }
	
	@GetMapping("/getById/{actno}")
	public Customer getById(@PathVariable int actno){
		return cs.getByAcno(actno);
	}
	
	@GetMapping("/getIdByJPQL/{actno}")
	public Customer getIdByJPQL(@PathVariable int actno){
		return cs.getByAcnoJPQL(actno);
	}
	
	@GetMapping("/getNameByJPQL/{name}")
	public Customer getNmaeByJPQL(@PathVariable String name){
		return cs.getByNameJPQL(name);
	}
	
	@DeleteMapping("/removeById/{actno}")
	public void removeById(@PathVariable int actno) {
	    cs.removeByAcno(actno);
	}
	
	@PutMapping("/updateAmt/{actno}/{amt}")
	public String UpdateAmt(@PathVariable int actno, @PathVariable double amt) {
		Customer c=cr.findById(actno).orElse(null);
		
		if(c==null) {
			System.out.println("Account not found.....");
		}
		else {
			double newBal=c.getBal()+amt;
			c.setBal(newBal);
			cs.DsaveData(c);
		}
		return "Amount Deposited Succesfully";
	}

	@PutMapping("/deposit/{actno}/{bal}")
	public int Deposit(@PathVariable int actno , @PathVariable double bal) {
		return cs.updateBalD(actno, bal);	
	}
	
	@PutMapping("/withdraw/{actno}/{bal}")
	public int Withdraw(@PathVariable int actno , @PathVariable double bal) {
		return cs.updateBalW(actno, bal);	
	}
	
	@DeleteMapping("/remove/{actno}")
	public int DeleteByJPQL(@PathVariable int actno) {
		return cs.deleteIdByJPQL(actno);	
	}
}
