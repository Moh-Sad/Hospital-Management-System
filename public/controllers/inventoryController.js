import { createConnection } from 'mysql2/promise';

// MySQL Database Configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || '12345',
    database: process.env.DB_NAME || 'hospital_management',
};

// Create a connection pool
const db = createConnection(dbConfig);

// Controller Functions

export const getAllItems = async (req, res) => {
    try {
        const connection = await db;
        const [items] = await connection.query('SELECT * FROM inventory');
        res.json(items);
    } catch (err) {
        console.error('Error fetching inventory:', err);
        res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
};

export const addItem = async (req, res) => {
    const { item_name, quantity } = req.body;
    try {
        const connection = await db;
        await connection.query('INSERT INTO inventory (item_name, quantity) VALUES (?, ?)', [item_name, quantity]);
        res.json({ message: 'Inventory item added successfully' });
    } catch (err) {
        console.error('Error adding inventory item:', err);
        res.status(500).json({ error: 'Failed to add inventory item' });
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { item_name, quantity } = req.body;
    try {
        const connection = await db;
        await connection.query('UPDATE inventory SET item_name = ?, quantity = ? WHERE id = ?', [item_name, quantity, id]);
        res.json({ message: 'Inventory item updated successfully' });
    } catch (err) {
        console.error('Error updating inventory item:', err);
        res.status(500).json({ error: 'Failed to update inventory item' });
    }
};

export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await db;
        await connection.query('DELETE FROM inventory WHERE id = ?', [id]);
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'Failed to delete inventory item' });
    }
};
