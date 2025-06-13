import java.util.*;

public class Main {
    public static void main(String[] args) {

        List<User> Users = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n====== User Menu ======");
            System.out.println("1. Sign In");
            System.out.println("2. Sign Up");
            System.out.println("3. Update Password");
            System.out.println("4. Remove User");
            System.out.println("5. Show All Users");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();
            sc.nextLine(); 

            switch (choice) {
            case 1:
                System.out.println("Sign In selected");
                System.out.print("Enter username: ");
                String signInUname = sc.nextLine();
                System.out.print("Enter password: ");
                String signInPassd = sc.nextLine();

                boolean signInSuccess = false;
                for (User user : Users) {
                    if (user.getUname().equals(signInUname) && user.getPassd().equals(signInPassd)) {
                        System.out.println("Sign-in successful for " + signInUname + "!");
                        signInSuccess = true; 
                        break; 
                    }
                }
                if (!signInSuccess) {
                    System.out.println("Invalid username or password.");
                }
                break;

            case 2:
                System.out.println("Sign Up selected");
                System.out.print("Enter user name - ");
                String newUname = sc.nextLine();
                System.out.print("Enter user Password - ");
                String newPassd = sc.nextLine();
                System.out.print("Enter user Email - ");
                String newEmail = sc.nextLine();
                System.out.print("Enter Age - ");
                int newAge = sc.nextInt();
                sc.nextLine(); 

                User u = new User(newUname, newPassd, newEmail, newAge);
                Users.add(u);
                System.out.println("User signed up successfully!");
                break;

            case 3:
                System.out.println("Update Password selected");
                System.out.print("Enter username to update password for: ");
                String updateUname = sc.nextLine();
                System.out.print("Enter current password: ");
                String currentPassd = sc.nextLine();

                
                boolean userFoundForUpdate = false;
                for (User user : Users) {
                    if (user.getUname().equals(updateUname) && user.getPassd().equals(currentPassd)) {
                        System.out.print("Enter new password: ");
                        String newPassword = sc.nextLine();
                        user.setPassd(newPassword);
                        System.out.println("Password updated successfully for " + updateUname + "!");
                        userFoundForUpdate = true; 
                        break;
                    }
                }
                if (!userFoundForUpdate) { 
                    System.out.println("User not found or current password incorrect.");
                }
                break;

            case 4:
                System.out.println("Remove User selected");
                System.out.print("Enter username to remove: ");
                String removeUname = sc.nextLine();
                System.out.print("Enter password to confirm: ");
                String confirmPassd = sc.nextLine();

                boolean userRemoved = false;
                for (int i = 0; i < Users.size(); i++) {
                    User user = Users.get(i);
                    if (user.getUname().equals(removeUname) && user.getPassd().equals(confirmPassd)) {
                        Users.remove(i);
                        System.out.println("User " + removeUname + " removed successfully!");
                        userRemoved = true; 
                        break; 
                    }
                }
                if (!userRemoved) { 
                    System.out.println("User not found or password incorrect.");
                }
                break;

            case 5:
                System.out.println("Show All Users selected");
                if (Users.isEmpty()) {
                    System.out.println("No users registered yet.");
                } else {
                    for (User obj : Users) {
                        System.out.println(obj.toString());
                    }
                }
                break;

            case 6:
                System.out.println("Exiting the application. Goodbye!");
                break;
            default:
                System.out.println("Invalid choice. Please try again.");
        }

    } while (choice != 6);

        sc.close();
    }
}