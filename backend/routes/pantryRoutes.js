const express = require('express');
const {
    addPantryStaff,
    getPantryStaff,
    assignTask,
    getStaffTasks,
    updatePreparationStatus,
    updateDeliveryStatus
} = require('../controller/pantryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addPantryStaff); // Add new pantry staff
router.get('/', protect, getPantryStaff); // Get all pantry staff
router.post('/assign-task', protect, assignTask); // Assign task to pantry staff
router.get('/:staffId/tasks', protect, getStaffTasks); // Get tasks of a specific staff
router.patch('/update-preparation', protect, updatePreparationStatus); // Update preparation status
router.patch('/update-delivery', protect, updateDeliveryStatus); // Update delivery status

module.exports = router;
