# Hospital Management System

A comprehensive web-based Hospital Management System designed to streamline administrative and clinical operations. It includes modules for authentication, patient management, appointments, inventory, and billing. This system allows efficient tracking and management of hospital resources and patient care.

## Features
- **User Authentication:** Secure login and registration for hospital staff and users.
- **Patient Management:** Store and manage patient data, including medical history and treatment.
- **Appointment Management:** Schedule, modify, and cancel patient appointments.
- **Inventory Management:** Track medical supplies and equipment in the hospital.
- **Billing System:** Generate and manage patient bills and payments.

## Project Structure

```
/Hospital Management System
├── /routes
│   ├── authRoutes.js           # Routes for user authentication
│   ├── patientRoutes.js        # Routes for patient management
│   ├── appointmentRoutes.js    # Routes for appointment scheduling
│   ├── inventoryRoutes.js      # Routes for inventory management
│   ├── billingRoutes.js        # Routes for billing management
│
├── /controllers
│   ├── authController.js       # Controller for user authentication logic
│   ├── patientController.js    # Controller for patient data handling
│   ├── appointmentController.js # Controller for appointment logic
│   ├── inventoryController.js  # Controller for inventory management
│   ├── billingController.js    # Controller for billing operations
│
├── /public
│   ├── /css                   # CSS files for styling
│   ├── /images                # Image assets
│   ├── /js                    # JavaScript files for client-side logic
│   ├── index.html             # Main landing page
│   ├── appointments.html       # Appointment management page
│   ├── billing.html            # Billing system page
│   ├── dashboard.html          # Dashboard for metrics and insights
│   ├── inventory.html          # Inventory tracking page
│   ├── login.html              # Login page
│   ├── patients.html           # Patient management page
│   ├── register.html           # Registration page
│   ├── reports.html            # Reports and analytics page
│
├── node_modules               # Folder containing installed dependencies required by the project
├── package.json               # Node.js module configuration
├── package-lock.json          # Node.js dependency tree lock file
├── server.js                  # Main server file to start the app
```

### Project Screenshots:

- **index.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/index.png)]
- **appointments.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/appointments.png)]
- **billing.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/billing.png)]
- **dashboard.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/dashboard.png)]
- **inventory.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/inventory.png)]
- **login.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/login.png)]
- **patients.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/patients.png)]
- **register.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/register.png)]
- **reports.html**: [![Screenshot Here](https://github.com/Moh-Sad/Hospital-Management-System/blob/master/public/images/reports.png)]

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hospital-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd hospital-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:

- **Create the required MySQL database and tables according to the provided schema.**
- **Update the database credentials in the server.js file.**

5. Start the server:
   ```bash
   npm start
   ```

   The application will be running on `http://localhost:3000`.

## Technologies Used

### Node.js and Libraries
- **Node.js**: JavaScript runtime environment for building scalable server-side applications.
- **Express.js**: Web framework for handling routes and middleware.
- **body-parser**: Middleware for parsing incoming request bodies.
- **mysql2**: Library for connecting and querying MySQL databases.

### Front-End Technologies
- **HTML**: Structure of the web pages.
- **CSS**: Styling and layout.
- **JavaScript**: Client-side interactivity.

### Database Management
- **MySQL**: Relational database for storing and managing hospital data.

### RESTful API
- Implements RESTful endpoints for modular and scalable communication between the client and server.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Designed with efficiency and scalability in mind.
- Thanks to all contributors and open-source libraries that made this possible.