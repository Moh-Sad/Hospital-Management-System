exports.getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await req.db.query('SELECT * FROM appointments');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

exports.addAppointment = async (req, res) => {
    const { patient_id, doctor_name, date } = req.body;
    try {
        await req.db.query('INSERT INTO appointments (patient_id, doctor_name, date) VALUES (?, ?, ?)', [patient_id, doctor_name, date]);
        res.json({ message: 'Appointment added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add appointment' });
    }
};

exports.updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { patient_id, doctor_name, date } = req.body;
    try {
        await req.db.query('UPDATE appointments SET patient_id = ?, doctor_name = ?, date = ? WHERE id = ?', [patient_id, doctor_name, date, id]);
        res.json({ message: 'Appointment updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update appointment' });
    }
};

exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM appointments WHERE id = ?', [id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
};
