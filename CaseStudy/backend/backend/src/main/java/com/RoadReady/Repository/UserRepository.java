package com.RoadReady.Repository; // Using your specified package name

import com.RoadReady.Entity.User; // Using your specified package name
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
