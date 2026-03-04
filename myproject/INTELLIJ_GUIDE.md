# Running Backend in IntelliJ IDEA

## Quick Start Guide

### 1. Open Project in IntelliJ
- Open IntelliJ IDEA
- Click `File` → `Open`
- Navigate to `C:\Users\kpras\fsproject\myproject`
- Click `OK`

### 2. Wait for Dependencies to Load
- IntelliJ will automatically detect it's a Maven project
- Wait for Maven to download all dependencies (check bottom right corner)
- If prompted, enable auto-import for Maven

### 3. Run the Application
**Option A: Using the Run Button**
- Open `MyprojectApplication.java` (src/main/java/com/example/myproject/)
- Click the green play button ▶️ next to the `main` method
- Select `Run 'MyprojectApplication'`

**Option B: Using Maven**
- Open the Maven panel (right side of IntelliJ)
- Navigate to `myproject` → `Plugins` → `spring-boot`
- Double-click `spring-boot:run`

### 4. Verify It's Running
- Look for "Started MyprojectApplication" in the console
- Backend will be available at: http://localhost:8080
- Test with: http://localhost:8080/users

### 5. H2 Database Console (Optional)
- Access at: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:crmdb`
- Username: `sa`
- Password: (leave blank)

## Troubleshooting

### If you get compilation errors:
1. `File` → `Project Structure` → `Project`
2. Set SDK to Java 17 or higher
3. Click `Apply` and `OK`

### If Lombok errors appear:
1. `File` → `Settings` → `Plugins`
2. Search for "Lombok"
3. Install and restart IntelliJ
4. `File` → `Settings` → `Build, Execution, Deployment` → `Compiler` → `Annotation Processors`
5. Enable "Enable annotation processing"

### If Maven dependencies aren't loading:
1. Right-click `pom.xml` → `Maven` → `Reload Project`
2. Or use: `View` → `Tool Windows` → `Maven` → Click refresh icon

## API Endpoints

Once running, available endpoints:

### Users/Login
- POST http://localhost:8080/users/login - Login
- POST http://localhost:8080/users - Create user
- GET http://localhost:8080/users - Get all users

### Customers
- GET http://localhost:8080/customers
- POST http://localhost:8080/customers
- DELETE http://localhost:8080/customers/{id}

### Products
- GET http://localhost:8080/products
- POST http://localhost:8080/products
- PUT http://localhost:8080/products/{id}
- DELETE http://localhost:8080/products/{id}

### Orders
- GET http://localhost:8080/orders
- POST http://localhost:8080/orders
- GET http://localhost:8080/orders/customer/{customerId}

## Configuration

The application uses H2 in-memory database by default for easy development.

To switch to PostgreSQL:
1. Open `src/main/resources/application.properties`
2. Comment out H2 configuration
3. Uncomment PostgreSQL configuration
4. Update credentials as needed
