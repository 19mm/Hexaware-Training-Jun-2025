package Java8;

public class User {
	int Uid;
	String name;
	Double salary;
	
	User()	{}
	
	public User(int uid, String name, Double salary) {
		super();
		Uid = uid;
		this.name = name;
		this.salary = salary;
	}
 
	public int getUid() {
		return Uid;
	}
	public void setUid(int uid) {
		Uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	
	@Override
	public String toString() {
		return "User [Uid=" + Uid + ", name=" + name + ", salary=" + salary + "]";
	}
}
 