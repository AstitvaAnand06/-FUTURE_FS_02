  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require('dotenv');

  dotenv.config();
  console.log("MONGO_URI:", process.env.MONGO_URI);
  const app = express();
  const PORT = process.env.PORT || 5001;

  // Middleware
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  // Routes
  app.use('/api/leads', require('./routes/leads'));
  app.use('/api/auth',  require('./routes/auth'));

  // Health check
  app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'CRM API running' }));

  // MongoDB
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crm_db')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

  module.exports = app;