const express = require('express');
const {
    getAllBills,
    addBill,
    updateBill,
    deleteBill
} = require('../public/controllers/billingController');

const router = express.Router();

router.get('/', getAllBills);
router.post('/', addBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;
