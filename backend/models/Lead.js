const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const leadSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, trim: true, default: '' },
  company:   { type: String, trim: true, default: '' },
  source:    {
    type: String,
    enum: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'],
    default: 'Website'
  },
  status:    {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
    default: 'New'
  },
  priority:  { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  notes:     [noteSchema],
  followUpDate: { type: Date, default: null },
  value:     { type: Number, default: 0 }, // estimated deal value
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
