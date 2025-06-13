package DAO;

import Model.Student;

public interface DAOStudentImpl {
	void saveData(Student s);
	void removeStudent(int rno);
	void updateStudent(int rno);
	void searchByRno(int rno);
	void searchByName(String name);
	void serachHQLNamMarkse(String name,double marks);
	void searchByMarks(double marks);
	void ShowData();
	void removeByRollNo(int rollno);
	void updateByQuery(int rollno, String name, double marks);
}
