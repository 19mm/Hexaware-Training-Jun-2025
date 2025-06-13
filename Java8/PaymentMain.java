package Java8;

public class PaymentMain {
	public static void main(String[] args) {
		double amount = 5000;
		Payment upi = (amount1)->{
			amount1 -= amount1* 0.05;
			return amount1;
		};
		
		Payment cash =(amount1)->{
			amount1 -=amount1* 0.1;
			return amount1;
		};
		Payment creditCard =(amount1)->{
			amount1 -=amount1* 0.04;
			return amount1;
		};
		
		Payment other =(amount1)->{
			amount1 -=amount1* 0.02;
			return amount1;
		};
		
 
		System.out.println(upi.callBill(amount));
		System.out.println(cash.callBill(amount));
		System.out.println(creditCard.callBill(amount));
		System.out.println(other.callBill(amount));
		
		
	}
}