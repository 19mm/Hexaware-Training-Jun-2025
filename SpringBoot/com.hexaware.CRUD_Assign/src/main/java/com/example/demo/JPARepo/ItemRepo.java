package com.example.demo.JPARepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Item;

import jakarta.transaction.Transactional;

@Repository
public interface ItemRepo extends JpaRepository<Item, String> {
	@Transactional
	@Modifying
	@Query("update Item i set i.price=:price where i.code=:code")
	public int update(@Param("code")String code,@Param("price") double price);
	
	
}
