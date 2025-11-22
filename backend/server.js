const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const accessRoutes = require('./routes/access');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://KAYDENV.github.io'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/access', accessRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Web3 Data Privacy Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
