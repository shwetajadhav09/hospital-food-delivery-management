const express = require('express');
const { 
    addPatient, 
    getPatients, 
    getPatientById,
    updatePatient,
    deletePatient 
} = require('../controller/patientController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Protected routes - require authentication
router.post('/', protect, addPatient);
router.get('/', protect, getPatients);
router.get('/:id', protect, getPatientById);
router.put('/:id', protect, updatePatient);
router.delete('/:id', protect, deletePatient);

module.exports = router;