package Spring_Core.Spring_Core;

import java.util.Map;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;

@SuppressWarnings("unused")
public class Employee {
	int empId;
	String name;
	int sal;
	Map<String, String>address;
	Project proj;
	
	Employee(){}

	public Employee(int empId, String name, int sal, Map<String, String> address, Project proj) {
		super();
		this.empId = empId;
		this.name = name;
		this.sal = sal;
		this.address = address;
		this.proj = proj;
	}

	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getSal() {
		return sal;
	}

	public void setSal(int sal) {
		this.sal = sal;
	}

	public Map<String, String> getAddress() {
		return address;
	}

	public void setAddress(Map<String, String> address) {
		this.address = address;
	}

	public Project getProj() {
		return proj;
	}

	public void setProj(Project proj) {
		this.proj = proj;
	}

	@Override
	public String toString() {
		return "Employee [empId=" + empId + ", name=" + name + ", sal=" + sal + ", address=" + address + "]";
	}
	
	 @PostConstruct
	    public void init() {
	        System.out.println("Employee bean is initialized using @PostConstruct.");
	    }

	    @PreDestroy
	    public void cleanup() {
	        System.out.println("Employee bean is being destroyed using @PreDestroy.");
	    }

	    public void afterPropertiesSet() throws Exception {
	        System.out.println("Employee initialized using InitializingBean.");
	    }

	    public void destroy() throws Exception {
	        System.out.println("Employee destroyed using DisposableBean.");
	    }
}
