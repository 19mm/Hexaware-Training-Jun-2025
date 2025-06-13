package Spring_Bank.Bank_Example;

public class Customer {
	int act_no;
	String name;
	int bal;
	String act_type;
	Loan loan;
	
	public Loan getLoan() {
		return loan;
	}

	public void setLoan(Loan loan) {
		this.loan = loan;
	}

	Customer() {}

	public Customer(int act_no, String name, int bal, String act_type) {
		super();
		this.act_no = act_no;
		this.name = name;
		this.bal = bal;
		this.act_type = act_type;
	}

	public int getAct_no() {
		return act_no;
	}

	public void setAct_no(int act_no) {
		this.act_no = act_no;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getBal() {
		return bal;
	}

	public void setBal(int bal) {
		this.bal = bal;
	}

	public String getAct_type() {
		return act_type;
	}

	public void setAct_type(String act_type) {
		this.act_type = act_type;
	}

	@Override
	public String toString() {
		return "Customer [act_no=" + act_no + ", name=" + name + ", bal=" + bal + ", act_type=" + act_type + "]";
	}

}
