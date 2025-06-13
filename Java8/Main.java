package Java8;
 
public class Main {
 
	public static void main(String[] args) {
		int a=20,b=50;
		Calulator sum = (x, y) -> x + y;
		Calulator sub = (x, y) -> x - y;
		System.out.println(sum.calc(a, b));
		System.out.println(sub.calc(a, b));
		}
}