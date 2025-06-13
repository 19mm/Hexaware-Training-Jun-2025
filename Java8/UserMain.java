package Java8;

import java.util.stream.*;
import java.util.*;

public class UserMain {
	List<User> users = new ArrayList<>();
	 
    users.add(new User(1, "Amit", 50000.0));
    users.add(new User(2, "Priya", 60000.0));
    users.add(new User(3, "Rahul", 55000.0));
    users.add(new User(4, "Sneha", 70000.0));
    users.add(new User(5, "Vikram", 48000.0));
    users.add(new User(6, "Pooja", 62000.0));
    users.add(new User(7, "Rohit", 75000.0));
    users.add(new User(8, "Neha", 58000.0));
    users.add(new User(9, "Ankit", 54000.0));
    users.add(new User(10, "Kiran", 67000.0));
    
    users.stream().forEach((u)-> System.out.println(u.toString()));
    users.stream().filter((e)->e.getSalary()>5000);
    
    List<String> namesStartingWithP = users.stream()	
            .filter(user -> user.getName().startsWith("P"))
            .map(User::getName)
            .collect(Collectors.toList());

    List<User> highSalaryUsers = users.stream()
            .filter(user -> user.getSalary() > 60000.0)
            .collect(Collectors.toList());

    List<String> uppercaseNames = users.stream()
            .map(user -> user.getName().toUpperCase())
            .collect(Collectors.toList());

    Map<Integer, String> userIdToNameMap = users.stream()
            .collect(Collectors.toMap(User::getId, User::getName));

}
}