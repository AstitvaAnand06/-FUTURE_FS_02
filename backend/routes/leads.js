const express = require('express');
const Lead    = require('../models/Lead');
const { protect } = require('../middleware/auth');
const router  = express.Router();

// All routes are protected
router.use(protect);

// GET /api/leads — get all leads (with filter/search/sort)
router.get('/', async (req, res) => {
  try {
    const { status, priority, source, search, sort = '-createdAt' } = req.query;
    const query = {};
    if (status)   query.status   = status;
    if (priority) query.priority = priority;
    if (source)   query.source   = source;
    if (search)   query.$or = [
      { name:    { $regex: search, $options: 'i' } },
      { email:   { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
    const leads = await Lead.find(query).sort(sort);
    res.json(leads);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/leads/stats — dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const total     = await Lead.countDocuments();
    const newLeads  = await Lead.countDocuments({ status: 'New' });
    const contacted = await Lead.countDocuments({ status: 'Contacted' });
    const converted = await Lead.countDocuments({ status: 'Converted' });
    const lost      = await Lead.countDocuments({ status: 'Lost' });
    const totalValue = await Lead.aggregate([{ $group: { _id: null, sum: { $sum: '$value' } } }]);
    const bySource  = await Lead.aggregate([{ $group: { _id: '$source', count: { $sum: 1 } } }]);
    res.json({ total, newLeads, contacted, converted, lost, totalValue: totalValue[0]?.sum || 0, bySource });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/leads/:id
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/leads — create lead
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, source, status, priority, followUpDate, value } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
    const lead = await Lead.create({ name, email, phone, company, source, status, priority, followUpDate, value });
    res.status(201).json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/leads/:id — update lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/leads/:id
router.delete('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/leads/:id/notes — add a note
router.post('/:id/notes', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Note text required' });
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    lead.notes.push({ text });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/leads/:id/notes/:noteId
router.delete('/:id/notes/:noteId', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    lead.notes = lead.notes.filter(n => n._id.toString() !== req.params.noteId);
    await lead.save();
    res.json(lead);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
