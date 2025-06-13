package Java8;
@FunctionalInterface
interface Payment {
	double callBill(double amt);
	default double disc(double amt) {
		return amt-(amt*0.05);
	}
}