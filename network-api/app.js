const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const registerRoutes = require('./routes/register');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/register', registerRoutes);

// Global error handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eposo';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));