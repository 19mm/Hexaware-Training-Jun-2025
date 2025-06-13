package Spring_Example.Spring_Example;

public class Student {
	int roll_no;
	String name;
	double fee;
	Address address;
	
	public Student() {}

	public Student(int roll_no, String name, double fee) {
		super();
		this.roll_no = roll_no;
		this.name = name;
		this.fee = fee;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public int getRoll_no() {
		return roll_no;
	}

	public void setRoll_no(int roll_no) {
		this.roll_no = roll_no;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}

	@Override
	public String toString() {
		return "Student [roll_no=" + roll_no + ", name=" + name + ", fee=" + fee + "]";
	}
}
