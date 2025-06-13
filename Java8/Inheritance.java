class Grandparent 
{
	Grandparent()
	{
		System.out.println("This is Grandparent class");
	}
	
}

class Parent extends Grandparent
{
	Parent()
	{
		System.out.println("This is Parent class");
	}
}

class Child extends Parent{
	Child()
	{
		System.out.println("This is Child Class");
	}
}
public class Inheritance{
	@SuppressWarnings("unused")
	public static void main(String args[]) {
	Child C=new Child();
	}
}	
