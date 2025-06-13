package Spring_Bank.Bank_Example;

public class Loan {
	int loanId;
	int loanAmt;
	int emi;
	
	Loan() {}

	public Loan(int loanId, int loanAmt, int emi) {
		super();
		this.loanId = loanId;
		this.loanAmt = loanAmt;
		this.emi = emi;
	}

	public int getLoanId() {
		return loanId;
	}

	public void setLoanId(int loanId) {
		this.loanId = loanId;
	}

	public int getLoanAmt() {
		return loanAmt;
	}

	public void setLoanAmt(int loanAmt) {
		this.loanAmt = loanAmt;
	}

	public int getEmi() {
		return emi;
	}

	public void setEmi(int emi) {
		this.emi = emi;
	}

	@Override
	public String toString() {
		return "Loan [loanId=" + loanId + ", loanAmt=" + loanAmt + ", emi=" + emi + "]";
	}
}
