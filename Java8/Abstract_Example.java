abstract class employee {
	String name;
	int salary;
	double bonus;
		
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSalary() {
		return salary;
	}
	public void setSalary(int salary) {
		this.salary = salary;
	}
	
	abstract void calBonus(); 
}

class Temp extends employee{
	void calBonus()
	{
		bonus=salary*0.05;
	}

	@Override
	public String toString() {
		return "Temp [name=" + name + ", salary=" + salary + ", bonus=" + bonus + "]";
	}
}

class Permanent extends employee{
	void calBonus()
	{
		bonus=salary*0.10;
	}

	@Override
	public String toString() {
		return "Permanent [name=" + name + ", salary=" + salary + ", bonus=" + bonus + "]";
	}
}

public class Abstract_Example{
	public static void main(String args[]) {
		Temp emp1=new Temp();
		emp1.setName("Mayuresh");
		emp1.setSalary(100000);
		emp1.calBonus();
		System.out.println(emp1.toString());
		
		Permanent emp2=new Permanent();
		emp2.setName("Firodiya");
		emp2.setSalary(500000);
		emp2.calBonus();
		System.out.println(emp2.toString());
	}
}
