package com.example.demo.JPARepo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Customer;

import jakarta.transaction.Transactional;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Integer>{
	//@Query("select c from Customer c") simple query (normal)
	@Query(value="select c from Customer" ,nativeQuery=true)
	List<Customer> getAllCustomer();
	
	//@Query("select c from Customer c where c.actno=:actno")
	@Query(value="select c from Customer c where c.actno=:actno", nativeQuery = true)
	public Customer findActnoByJPQL(@Param("actno") int actno);
	
	//@Query("select c from Customer c where c.name=:name")
	@Query(value="select c from Customer c where c.name=:name", nativeQuery = true)
	public Customer findNameByJPQL(@Param("name") String name);
	
	@Transactional
	@Modifying
	//@Query("update Customer c set c.bal=c.bal+ :bal where c.actno=:actno")
	@Query(value="update Customer c set c.bal=c.bal+ :bal where c.actno=:actno", nativeQuery = true)
	public int deposit(@Param("actno")int actno, @Param("bal")double bal);
	
	@Transactional
	@Modifying
	//@Query("update Customer c set c.bal = c.bal - :bal where c.actno =:actno")
	@Query(value="update Customer c set c.bal = c.bal - :bal where c.actno =:actno", nativeQuery = true)
	public int Withdraw(@Param("actno") int actno, @Param("bal") double bal);
	
	@Transactional
	@Modifying
	//@Query("delete from Customer c where c.actno =:actno")
	@Query(value="delete from Customer c where c.actno =:actno", nativeQuery = true)
	public int delete(@Param("actno") int actno);
}
