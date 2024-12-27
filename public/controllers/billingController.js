import { createConnection } from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'admin',
    password: '12345',
    database: 'hospital_management',
};

async function createDbConnection() {
    return await createConnection(dbConfig);
}

export const getAllBills = async (req, res) => {
    try {
        const db = await createDbConnection();
        const [bills] = await db.query(`
            SELECT billing.id, patients.name AS patient_name, billing.amount, billing.created_at 
            FROM billing 
            INNER JOIN patients ON billing.patient_id = patients.id
        `);
        res.json(bills);
    } catch (err) {
        console.error('Error fetching billing records:', err);
        res.status(500).json({ error: 'Failed to fetch billing records' });
    }
};

export const addBill = async (req, res) => {
    const { patient_id, amount } = req.body;
    try {
        const db = await createDbConnection();
        await db.query('INSERT INTO billing (patient_id, amount) VALUES (?, ?)', [patient_id, amount]);
        res.json({ message: 'Bill added successfully' });
    } catch (err) {
        console.error('Error adding bill:', err);
        res.status(500).json({ error: 'Failed to add bill' });
    }
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { patient_id, amount } = req.body;
    try {
        const db = await createDbConnection();
        await db.query('UPDATE billing SET patient_id = ?, amount = ? WHERE id = ?', [patient_id, amount, id]);
        res.json({ message: 'Bill updated successfully' });
    } catch (err) {
        console.error('Error updating bill:', err);
        res.status(500).json({ error: 'Failed to update bill' });
    }
};

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await createDbConnection();
        await db.query('DELETE FROM billing WHERE id = ?', [id]);
        res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
        console.error('Error deleting bill:', err);
        res.status(500).json({ error: 'Failed to delete bill' });
    }
};

export const getPatients = async (req, res) => {
    try {
        const db = await createDbConnection();
        const [patients] = await db.query('SELECT id, name FROM patients');
        res.json(patients);
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};