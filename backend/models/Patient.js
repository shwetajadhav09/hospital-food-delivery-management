const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    diseases: { type: String },
    allergies: { type: String },
    roomNumber: { type: Number, required: true },
    bedNumber: { type: Number, required: true },
    floorNumber: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactInfo: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    additionalDetails: { type: String }
});

module.exports = mongoose.model('Patient', patientSchema);
