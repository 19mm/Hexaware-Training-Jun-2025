package Java8;
import java.util.*;

public class StreamAPI {
	  int[] arr = {1,2,3,4,5,6,7,8,9,10};
      Arrays.stream(arr).forEach((i) -> System.out.println(i));

      String[] arr1 = {"apple", "orange", "grapes"};
      Arrays.stream(arr1).forEach((s) -> System.out.println(s));
		
      Double[] arr2= {2000.0,5000.0,15000.,10000.0};
      Arrays.stream(arr2).filter((sal)->sal>5000).forEach(sal).system.out.println(sal);
      
      @SuppressWarnings("rawtypes")
	  List<Integer>Salary=new ArrayList();
      
      Salary.add(10000);
      Salary.add(20000);
      Salary.add(15000);
      Salary.add(25000);
      
      Arrays.stream(Salary)
      .map((i)->i+(i*0.05))
      .forEach((i)-> System.out.println(i));
	} 
}
