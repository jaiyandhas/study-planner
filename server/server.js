import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import studyPlanRoutes from './routes/studyPlanRoutes.js';

import { connectDB } from './config/db.js';
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.get('/health', (req, res) => {
    res.json({ message: 'Server is running', timestamp: Date.now() });
});

// Catch-all 404 handler
app.use('/api', authRoutes);
app.use('/api', studyPlanRoutes);

// --- BEGIN: Serve frontend / health route & favicon ---
const possibleFrontends = [
  path.join(__dirname, 'public'),        // common Express static folder
  path.join(__dirname, 'dist', 'public'),// Vite + server build output
  path.join(__dirname, '..', 'Client', 'build'), // CRA build
  path.join(__dirname, '..', 'Client', 'dist'),  // other builds
];

let served = false;
for (const p of possibleFrontends) {
  if (fs.existsSync(p)) {
    app.use(express.static(p));
    // serve index.html for SPA routes
    app.get('/', (req, res) => res.sendFile(path.join(p, 'index.html')));
    served = true;
    console.log('✓ Serving static frontend from:', p);
    break;
  }
}

// fallback root route (health)
if (!served) {
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'Study Planner backend — API is running.',
      apiBase: '/api',
      timestamp: Date.now()
    });
  });
}

// handle favicon quietly
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
// --- END: Serve frontend / health route & favicon ---

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