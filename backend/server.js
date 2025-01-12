// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dietChartRoutes = require('./routes/dietChartRoutes');
const pantryRoutes = require('./routes/pantryRoutes');
// const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dietcharts', dietChartRoutes);
app.use('/api/pantry', pantryRoutes);

// Error Handling Middleware
// app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
