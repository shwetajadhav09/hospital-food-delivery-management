const PantryStaff = require('../models/PantryStaff');
const PantryTask = require('../models/PantryTask');

// Add new pantry staff
const addPantryStaff = async (req, res) => {
    try {
        const newStaff = new PantryStaff(req.body);
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        res.status(500).json({ error: 'Error adding pantry staff' });
    }
};

// Get all pantry staff
const getPantryStaff = async (req, res) => {
    try {
        const staff = await PantryStaff.find();
        res.json(staff);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching pantry staff' });
    }
};

// Assign a task to pantry staff
const assignTask = async (req, res) => {
    const { staffId, mealType } = req.body;
    try {
        const staff = await PantryStaff.findById(staffId);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        const newTask = new PantryTask({ staffId, mealType });
        await newTask.save();
        res.status(201).json({ message: 'Task assigned successfully', task: newTask });
    } catch (err) {
        res.status(500).json({ error: 'Error assigning task' });
    }
};

// Get tasks assigned to a specific staff member
const getStaffTasks = async (req, res) => {
    try {
        const { staffId } = req.params;
        const tasks = await PantryTask.find({ staffId }).populate('staffId');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Update preparation status of a task
const updatePreparationStatus = async (req, res) => {
    const { taskId, status } = req.body;
    try {
        const task = await PantryTask.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.preparationStatus = status;
        await task.save();
        res.json({ message: 'Preparation status updated', task });
    } catch (err) {
        res.status(500).json({ error: 'Error updating preparation status' });
    }
};

// Update delivery status of a task
const updateDeliveryStatus = async (req, res) => {
    const { taskId, status } = req.body;
    try {
        const task = await PantryTask.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.deliveryStatus = status;
        await task.save();
        res.json({ message: 'Delivery status updated', task });
    } catch (err) {
        res.status(500).json({ error: 'Error updating delivery status' });
    }
};

module.exports = {
    addPantryStaff,
    getPantryStaff,
    assignTask,
    getStaffTasks,
    updatePreparationStatus,
    updateDeliveryStatus
};
