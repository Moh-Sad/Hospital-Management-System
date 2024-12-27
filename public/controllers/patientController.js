exports.getAllPatients = async (req, res) => {
    try {
        const [patients] = await req.db.query('SELECT * FROM patients');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

exports.addPatient = async (req, res) => {
    const { name, age, contact } = req.body;
    try {
        await req.db.query('INSERT INTO patients (name, age, contact) VALUES (?, ?, ?)', [name, age, contact]);
        res.json({ message: 'Patient added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add patient' });
    }
};

exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { name, age, contact } = req.body;
    try {
        await req.db.query('UPDATE patients SET name = ?, age = ?, contact = ? WHERE id = ?', [name, age, contact, id]);
        res.json({ message: 'Patient updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update patient' });
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM patients WHERE id = ?', [id]);
        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete patient' });
    }
};