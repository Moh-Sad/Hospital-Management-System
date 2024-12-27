const express = require('express');
const {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
} = require('../public/controllers/inventoryController');

const router = express.Router();

router.get('/', getAllItems);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
