const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profilRoutes = require('./routes/profilRoutes');
const statusChambreRoutes = require('./routes/statusChambreRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/utilisateurs', userRoutes);
app.use('/api/profils', profilRoutes);
app.use('/api/status-chambres', statusChambreRoutes);
app.use('/api/chambres', chambreRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/achats', require('./routes/achatRoutes'));
app.use('/api/uniters', require('./routes/uniterRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API Node.js' }); // French greeting as requested implicitly by user language
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(err.status || 500).json({
        message: 'Une erreur est survenue!',
        error: err.message // temporary for debugging
    });
});

module.exports = app;
