import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import studyPlanRoutes from './routes/studyPlanRoutes.js';

import { connectDB } from './config/db.js';
connectDB();

const app = express();

// Middleware
app.use(cors({"orgin": "*"}));
app.use(express.json());


// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
    }
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Study Planner Server', status: 'running' });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({ message: 'Server is running' });
});

// API routes
app.use('/api', authRoutes);
app.use('/api', studyPlanRoutes);

// Test route to verify POST works at all
app.post('/test', (req, res) => {
    console.log('Test POST received');
    res.json({ message: 'Test POST works', body: req.body });
});

// Catch-all 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.path);
    res.status(404).json({ message: 'Route not found', path: req.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✓ Server is running on port ${PORT}`);
});