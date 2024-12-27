const express = require('express');
const {
    getAllPatients,
    addPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

const router = express.Router();

router.get('/', getAllPatients);
router.post('/', addPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

router.get('/', (req, res, next) => {
    console.log('GET /api/patients received');
    next();
}, getAllPatients);


module.exports = router;
