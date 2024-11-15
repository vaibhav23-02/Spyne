import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import cors from 'cors'
import path from 'path'

const _dirname = path.resolve()

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://car2-2.onrender.com', // Replace with your frontend URL
    credentials: true, // Allow cookies/auth headers if needed
  }));
// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes


app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/docs', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/29368389/2sAY55bJ7a');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(_dirname, "/spyne_frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "spyne_frontend","dist","index.html"))
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});