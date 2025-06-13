package Model;

import jakarta.persistence.*;

@Entity

@NamedQueries({
	@NamedQuery(name="Student.findAll",query ="from Student" ),
	@NamedQuery(name="Student.removeByRoll",query ="delete from Student where rno=:rno" ),
	@NamedQuery(name="Student.searchByName",query ="from Student where name=:name" )
})
public class Student {
	@Id
	int rno;
	String name;
	double marks;
	
	public Student(){}
	
	public Student(int rno, String name, double marks) {
		super();
		this.rno = rno;
		this.name = name;
		this.marks = marks;
	}

	public int getRno() {
		return rno;
	}

	public void setRno(int rno) {
		this.rno = rno;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getMarks() {
		return marks;
	}

	public void setMarks(double marks) {
		this.marks = marks;
	}

	@Override
	public String toString() {
		return "Student [rno=" + rno + ", name=" + name + ", marks=" + marks + "]";
	}
}
