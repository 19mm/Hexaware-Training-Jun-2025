# 🚗 RoadReady - Car Rental System

**RoadReady** is a full-stack web-based car rental platform that allows users to search, book, and manage car rentals with ease. It includes secure user authentication, an admin dashboard for fleet management, payment processing, and user feedback functionality. Built using **React.js**, **Spring Boot**, and **MySQL**, the system offers a responsive and intuitive experience for both customers and administrators.

---

## 🔧 Tech Stack

| Layer         | Technology              |
|--------------|--------------------------|
| Frontend     | React.js + Semantic UI   |
| Backend      | Spring Boot (Java)       |
| Database     | MySQL                    |
| API Testing  | Postman, Swagger UI      |
| Security     | JWT (JSON Web Token)     |

---

## ✅ Features Implemented

### 👤 User Features
- **User Registration & Login**
- **Profile Management**
- **Browse and Filter Cars**
- **View Car Details**
- **Reserve Cars (Pickup & Drop-off)**
- **Manage Bookings (View/Cancel/Modify)**
- **Secure Payments**
- **View Booking & Payment History**
- **Rate and Review Cars**

### 🛠️ Admin Features
- **User Account Management**
- **Car Listings Management (Add/Edit/Delete)**
- **Update Car Availability & Pricing**
- **View All Reservations**
- **Manage Reviews**

---

## 🔐 Authentication & Authorization

- Implemented JWT-based authentication
- Role-based access control for admin and user routes
- Protected APIs and token verification
- Logout by clearing the token on client-side

---

## 🚀 Running the Project

### Backend (Spring Boot)
1. Clone the repository
2. Configure your database in `application.properties`
3. Run the application:
   ```bash
   ./mvnw spring-boot:run

## Frontend (React.js)
1. Navigate to frontend folder
2. Install dependencies:
```npm install
3. Run the app:
```npm start
- Make sure to configure the .env file with your API base URL.

---

### 🧪 API Documentation
- Swagger UI: Accessible at http://localhost:9090/swagger-ui/ after starting the backend

