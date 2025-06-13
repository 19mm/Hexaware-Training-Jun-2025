public class Exception {
	public static void main(String aa[])
	{
		System.out.println("before  the exception ");
 
	   int a=10,b=4;
	   int A[]= {2,4,5,6,8,9};
	   int c=0;
	   
	   try{
		   c=a/b;  
	       System.out.println(A[8]);  
	   }
	   catch(IndexOutOfBoundsException e){
		   System.out.println(e.getMessage());
	   }
	   
	   catch(ArithmeticException e){
		   System.out.println(e.getMessage());
	   }
	   
	   finally{
		   System.out.println("close ...");
	   }
	   
	   System.out.println("c = "+ c);
	   System.out.println("after the exception ");
	   }
}