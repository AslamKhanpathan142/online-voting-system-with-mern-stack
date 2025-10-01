const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 }
    }
  ],
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expiresAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
