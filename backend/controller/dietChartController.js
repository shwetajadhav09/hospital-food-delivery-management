// controllers/dietChartController.js

const DietChart = require('../models/DietChart');

// Get all diet charts
const getAllDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find().populate('patientId', 'name'); // Populate patient details
    res.status(200).json(dietCharts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch diet charts.' });
  }
};

// Create a new diet chart
const createDietChart = async (req, res) => {
  const { patientId, morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;

  try {
    const newDietChart = new DietChart({
      patientId,
      morningMeal,
      eveningMeal,
      nightMeal,
      ingredients,
      instructions,
    });

    await newDietChart.save();
    res.status(201).json(newDietChart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create diet chart.' });
  }
};

// Update a diet chart
const updateDietChart = async (req, res) => {
  const { id } = req.params;
  const { morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;

  try {
    const updatedDietChart = await DietChart.findByIdAndUpdate(
      id,
      { morningMeal, eveningMeal, nightMeal, ingredients, instructions },
      { new: true }
    );

    if (!updatedDietChart) {
      return res.status(404).json({ message: 'Diet chart not found.' });
    }

    res.status(200).json(updatedDietChart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update diet chart.' });
  }
};

// Delete a diet chart
const deleteDietChart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDietChart = await DietChart.findByIdAndDelete(id);

    if (!deletedDietChart) {
      return res.status(404).json({ message: 'Diet chart not found.' });
    }

    res.status(200).json({ message: 'Diet chart deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete diet chart.' });
  }
};

module.exports = { getAllDietCharts, createDietChart, updateDietChart, deleteDietChart };
