public class User {
	String Uname;   // data member
	String Passd;
	String Email;
	int age;
	
	
	User()
	{
		Uname="";   // data member
		Passd="";
		Email="";
		age=0;
	}
	
	User(String  Uname,String Passd, String Email,int age)
	{
		this.Uname=Uname;
		this.Passd=Passd;
		this.Email=Email;
		this.age=age;
		
	}
	
	public String getUname() {
		return Uname;
	}
	public void setUname(String uname) {
		Uname = uname;
	}
	public String getPassd() {
		return Passd;
	}
	public void setPassd(String passd) {
		Passd = passd;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		return "User [Uname=" + Uname + ", Passd=" + Passd + ", Email=" + Email + ", age=" + age + "]";
	}
}

