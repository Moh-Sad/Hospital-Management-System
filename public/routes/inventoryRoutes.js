import express from 'express';
import {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
} from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', getAllItems);
router.post('/', addItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
