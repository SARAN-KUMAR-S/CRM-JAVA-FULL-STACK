Shop CRM System
Full-stack CRM application with a React frontend and a Spring Boot backend for managing users, customers, products, deals, orders, and sales history.

Project Structure
fsproject/
├── src/                      # React frontend source
├── public/                   # React public assets
├── package.json              # Frontend dependencies/scripts
└── myproject/                # Spring Boot backend
	 ├── pom.xml
	 └── src/main/java/com/example/myproject
Tech Stack
Frontend
React (Create React App)
React Router
Fetch API for backend communication
Backend
Spring Boot 4
Spring Web
Spring Data JPA
PostgreSQL (configured)
H2 dependency available for runtime
Maven
Features
User signup and login (/users and /users/login)
Dashboard summary (customers, orders, products, revenue)
Customer management
Product management
Order management
Deal management
Sales history view
Prerequisites
Node.js 18+ and npm
Java 17+
Maven 3.9+ (or use mvnw / mvnw.cmd)
PostgreSQL running locally
Backend Setup (Spring Boot)
Open myproject/src/main/resources/application.properties and set your PostgreSQL values:

spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
server.port=8080
Start the backend from the myproject folder:

Windows (PowerShell/CMD):

.\mvnw.cmd spring-boot:run
Or with Maven installed globally:

mvn spring-boot:run
Backend runs on http://localhost:8080.

Frontend Setup (React)
From the project root (fsproject), install dependencies:

npm install
Start the frontend:

npm start
Frontend runs on http://localhost:3000.

Running Full App Locally
Start backend first, then start frontend.

Terminal 1:
cd myproject
.\mvnw.cmd spring-boot:run
Terminal 2:
npm start
API Endpoints (Current Controllers)
Users
GET /users
GET /users/{id}
POST /users
DELETE /users/{id}
POST /users/login
Customers
GET /customers
GET /customers/{id}
POST /customers
PUT /customers/{id}
DELETE /customers/{id}
Products
GET /products
GET /products/{id}
POST /products
PUT /products/{id}
DELETE /products/{id}
Orders
GET /orders
GET /orders/{id}
GET /orders/customer/{customerId}
POST /orders
PUT /orders/{id}/status
DELETE /orders/{id}
Deals
GET /deals
GET /deals/{id}
POST /deals
PUT /deals/{id}
DELETE /deals/{id}
Frontend Scripts
npm start - Run app in development mode
npm test - Run tests
npm run build - Build production bundle
Backend Test
From myproject:

.\mvnw.cmd test
Notes
Frontend components currently call backend directly at http://localhost:8080.
CORS is enabled in controllers via @CrossOrigin.
