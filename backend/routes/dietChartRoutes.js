// routes/dietChartRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllDietCharts,
  createDietChart,
  updateDietChart,
  deleteDietChart,
} = require('../controller/dietChartController');

// Get all diet charts
router.get('/api/dietcharts', getAllDietCharts);

// Create a new diet chart
router.post('/api/dietcharts', createDietChart);

// Update a diet chart
router.put('/api/dietcharts/:id', updateDietChart);

// Delete a diet chart
router.delete('/api/dietcharts/:id', deleteDietChart);

module.exports = router;
