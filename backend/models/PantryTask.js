const mongoose = require('mongoose');

const pantryTaskSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'PantryStaff', required: true },
    mealType: { type: String, enum: ['Morning', 'Evening', 'Night'], required: true },
    preparationStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    deliveryStatus: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    assignedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PantryTask', pantryTaskSchema);
