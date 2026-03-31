const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'crm_secret_key_change_in_production';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    console.log('Register body:', req.body);
    const username = (req.body.username || '').trim();
    const password = (req.body.password || '').trim();

    if (!username || !password)
      return res.status(400).json({ success: false, error: 'Username and password required' });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ success: false, error: 'Username already exists. Try logging in.' });

    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, token, username: user.username });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    console.log('Login body:', req.body);
    const username = (req.body.username || '').trim();
    const password = (req.body.password || '').trim();

    if (!username || !password)
      return res.status(400).json({ success: false, error: 'Username and password required' });

    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, username: user.username });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;