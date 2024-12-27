const express = require('express');
const {
    getAllAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
} = require('../public/controllers/appointmentController');

const router = express.Router();

router.get('/', getAllAppointments);
router.post('/', addAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
