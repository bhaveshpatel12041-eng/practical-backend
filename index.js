const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Simple Schema (optional for hello world, but good practice)
const MessageSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// API Routes
app.get('/api/hello', async (req, res) => {
    try {
        res.json({ message: "Hello World from Node Backend!", status: "success" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
