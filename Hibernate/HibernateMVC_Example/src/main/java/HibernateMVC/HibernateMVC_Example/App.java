package HibernateMVC.HibernateMVC_Example;

import Service.StudentService;

public class App 
{
    public static void main( String[] args )
    {
    	StudentService service=new StudentService();
    	//service.saveStudent();
    	//service.removeStudent();
    	//service.updateStudent();
    	//service.searchByRno();
    	service.searchByName();
    	//service.ShowData();
    	//service.serachHQLNamMarkse();
    	//service.searchByMarks();
    	//service.removeByRollNo();
    	//service.updateByQuery();
    }
}
