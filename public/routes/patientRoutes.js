import express from 'express';
import { addPatient, getPatients, deletePatient } from '../controllers/patientController.js';

const router = express.Router();


// Route to handle adding a new patient
router.post('/add', addPatient);

// Route to get the list of all patients
router.get('/', getPatients);

// Route to handle deleting a patient by ID
router.delete('/:id', deletePatient);

export default router;
