import express from 'express';
import {
    getAllBills,
    addBill,
    updateBill,
    deleteBill
} from '../controllers/billingController.js';

const router = express.Router();

router.get('/', getAllBills);
router.post('/', addBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

export default router;
