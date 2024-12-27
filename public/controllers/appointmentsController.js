import { createConnection } from 'mysql2';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'hospital_management'
};

const connection = createConnection(dbConfig);

// Function to add a new appointment
export const addAppointment = (req, res) => {
    const { patientName, doctorName, date } = req.body;

    // Basic validation
    if (!patientName || !doctorName || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert appointment into the database
    const query = 'INSERT INTO appointments (patientName, doctorName, date) VALUES (?, ?, ?)';
    connection.query(query, [patientName, doctorName, date], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(201).json({ message: 'Appointment added successfully!' });
    });
};

// Function to get all appointments
export const getAppointments = (req, res) => {
    const query = 'SELECT * FROM appointments';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(200).json({ appointments: results });
    });
};

// Function to delete an appointment by ID
export const deleteAppointment = (req, res) => {
    const appointmentId = req.params.appointmentId;

    // Validate if appointmentId is provided
    if (!appointmentId) {
        return res.status(400).json({ error: 'Appointment ID is required' });
    }

    // Delete appointment from the database
    const query = 'DELETE FROM appointments WHERE appointmentId = ?';
    connection.query(query, [appointmentId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Check if any appointment was deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return res.status(200).json({ message: 'Appointment deleted successfully' });
    });
};