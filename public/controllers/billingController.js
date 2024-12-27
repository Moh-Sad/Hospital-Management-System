export const getAllBills = async (req, res) => {
    try {
        const [bills] = await req.db.query(`
            SELECT billing.id, patients.name AS patient_name, billing.amount, billing.created_at 
            FROM billing 
            INNER JOIN patients ON billing.patient_id = patients.id
        `);
        res.json(bills);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch billing records' });
    }
};

export const addBill = async (req, res) => {
    const { patient_id, amount } = req.body;
    try {
        await req.db.query('INSERT INTO billing (patient_id, amount) VALUES (?, ?)', [patient_id, amount]);
        res.json({ message: 'Bill added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add bill' });
    }
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { patient_id, amount } = req.body;
    try {
        await req.db.query('UPDATE billing SET patient_id = ?, amount = ? WHERE id = ?', [patient_id, amount, id]);
        res.json({ message: 'Bill updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update bill' });
    }
};

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM billing WHERE id = ?', [id]);
        res.json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete bill' });
    }
};
