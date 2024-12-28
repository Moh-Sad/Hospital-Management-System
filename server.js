import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createConnection } from 'mysql2';
import { static as serveStatic } from 'express';
import authRoutes from './public/routes/authRoutes.js';
import patientRoutes from './public/routes/patientRoutes.js';
import appointmentRoutes from './public/routes/appointmentRoutes.js';
import inventoryRoutes from './public/routes/inventoryRoutes.js';
import billingRoutes from './public/routes/billingRoutes.js';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database Configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'hospital_management'
};

const connection = createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database!');
});

const app = express();

// Serve static files
app.use(serveStatic(join(__dirname, 'public')));

// Middleware for parsing JSON
app.use(express.json());

// Attach the database connection to requests
app.use((req, res, next) => {
    req.db = connection;
    next();
});

// Route Handlers
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/billing', billingRoutes); // Use billing routes under the /api/billing endpoint

// Dashboard Metrics Endpoint
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

// 404 Error Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});