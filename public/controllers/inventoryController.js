exports.getAllItems = async (req, res) => {
    try {
        const [items] = await req.db.query('SELECT * FROM inventory');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
};

exports.addItem = async (req, res) => {
    const { item_name, quantity } = req.body;
    try {
        await req.db.query('INSERT INTO inventory (item_name, quantity) VALUES (?, ?)', [item_name, quantity]);
        res.json({ message: 'Inventory item added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add inventory item' });
    }
};

exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { item_name, quantity } = req.body;
    try {
        await req.db.query('UPDATE inventory SET item_name = ?, quantity = ? WHERE id = ?', [item_name, quantity, id]);
        res.json({ message: 'Inventory item updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update inventory item' });
    }
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.query('DELETE FROM inventory WHERE id = ?', [id]);
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete inventory item' });
    }
};
