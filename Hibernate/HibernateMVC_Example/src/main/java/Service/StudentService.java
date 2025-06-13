package Service;

import java.util.Scanner;

import DAO.StudentDAO;
import Model.Student;

public class StudentService {
	Student s;
	StudentDAO dao;
	
	Scanner sc;
	
	public StudentService() {
		sc=new Scanner(System.in);
		s=new Student();
		dao=new StudentDAO();
	}
	
	public void saveStudent() {
		System.out.println("Enter Roll Number: ");
		s.setRno(sc.nextInt());
		System.out.println("Enter Name: ");
		sc.nextLine();
		s.setName(sc.nextLine());
		System.out.println("Enter Marks: ");
		s.setMarks(sc.nextDouble());
		
		dao.saveData(s);
	}
	
	public void removeStudent() {
		System.out.println("Enter Roll Number: ");
		s.setRno(sc.nextInt());
		
		dao.removeStudent(s.getRno());
	}

	public void updateStudent() {
		System.out.println("Enter Roll Number: ");
		s.setRno(sc.nextInt());
		
		dao.updateStudent(s.getRno());	
	}
	
	public void searchByRno() {
		System.out.println("Enter Roll Number: ");
		s.setRno(sc.nextInt());
		
		dao.searchByRno(s.getRno());
	}
	
	public void ShowData(){
			dao.ShowData();
	}
	
	public void searchByName() {
		System.out.println("Enter Name: ");
		s.setName(sc.nextLine());
		
		dao.searchByName(s.getName());
	}
	
	public void serachHQLNamMarkse(){
		System.out.println("Enter Name: ");
		s.setName(sc.nextLine());
		System.out.println("Enter Marks: ");
		s.setMarks(sc.nextDouble());
		
		dao.serachHQLNamMarkse(s.getName(), s.getMarks());
	}
	
	public void searchByMarks() {
		System.out.println("Enter Marks: ");
		s.setMarks(sc.nextDouble());
		
		dao.searchByMarks(s.getMarks());
	}
	
	public void removeByRollNo() {
		System.out.println("Enter Roll Number: ");
		s.setRno(sc.nextInt());
		
		dao.removeByRollNo(s.getRno());
	}
	
	public void updateByQuery() {
		System.out.println("Enter New Roll Number: ");
		s.setRno(sc.nextInt());
		System.out.println("Enter New Name: ");
		sc.nextLine();
		s.setName(sc.nextLine());
		System.out.println("Enter New Marks: ");
		s.setMarks(sc.nextDouble());
		
		dao.updateByQuery(s.getRno(), s.getName(), s.getMarks());
	}
}
