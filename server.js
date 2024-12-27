const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2'); // No need for promise-based API here

// Load environment variables
require('dotenv').config();

// Database credentials
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'hospital_management'
};

// Create a direct connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); 
    }
    console.log('Connected to the MySQL database!');
});

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Attach database connection to each request
app.use((req, res, next) => {
    req.db = connection; // Use the single connection for all requests
    next();
});

/*
// Routes (Organize routes outside the `public` folder)
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const billingRoutes = require('./routes/billingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/billing', billingRoutes);

*/

// Example API for Dashboard metrics
app.get('/api/dashboard/metrics', (req, res) => {
    const patientQuery = 'SELECT COUNT(*) AS totalPatients FROM patients';
    const appointmentQuery = `
        SELECT COUNT(*) AS appointmentsToday 
        FROM appointments 
        WHERE DATE(date) = CURDATE()
    `;

    req.db.query(patientQuery, (err, patientResults) => {
        if (err) {
            console.error('Error fetching totalPatients:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        req.db.query(appointmentQuery, (err, appointmentResults) => {
            if (err) {
                console.error('Error fetching appointmentsToday:', err);
                return res.status(500).json({ error: 'Database query failed' });
            }

            res.json({
                totalPatients: patientResults[0].totalPatients,
                appointmentsToday: appointmentResults[0].appointmentsToday
            });
        });
    });
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
