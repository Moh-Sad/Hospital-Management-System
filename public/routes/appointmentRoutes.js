import express from 'express';
import { addAppointment, getAppointments, deleteAppointment } from '../controllers/appointmentsController.js';

const router = express.Router();

// Route to add a new appointment
router.post('/add', addAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to delete an appointment
router.delete('/:appointmentId', deleteAppointment);

export default router;