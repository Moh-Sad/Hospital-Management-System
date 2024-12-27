import { createConnection } from 'mysql2';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'hospital_management'
};

const connection = createConnection(dbConfig);

// Function to add a new patient
export const addPatient = (req, res) => {
    const { name, age, contact } = req.body;

    // Basic validation
    if (!name || !age || !contact) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert patient into the database
    const query = 'INSERT INTO patients (name, age, contact) VALUES (?, ?, ?)';
    connection.query(query, [name, age, contact], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(201).json({ message: 'Patient added successfully!' });
    });
};

// Function to get all patients (for the patient list)
export const getPatients = (req, res) => {
    const query = 'SELECT * FROM patients';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        return res.status(200).json({ patients: results });
    });
};

// Function to delete a patient by ID
export const deletePatient = (req, res) => {
    const patientId = req.params.id;

    // Validate if patientId is provided
    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    // Delete patient from the database
    const query = 'DELETE FROM patients WHERE id = ?';
    connection.query(query, [patientId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Check if any patient was deleted
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        return res.status(200).json({ message: 'Patient deleted successfully' });
    });
};
