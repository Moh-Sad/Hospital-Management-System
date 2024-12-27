import express from 'express';
import {
    getAllBills,
    addBill,
    updateBill,
    deleteBill,
    getPatients
} from '../controllers/billingController.js';

const router = express.Router();

router.get('/api/billing', getAllBills);
router.post('/api/billing', addBill);
router.put('/api/billing/:id', updateBill);
router.delete('/api/billing/:id', deleteBill);
router.get('/api/patients', getPatients); // Fetch patient list for dropdown

export default router;
