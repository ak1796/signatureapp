const mongoose = require('mongoose');

const signatureSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  x: Number,
  y: Number,
  page: Number,
  status: { type: String, enum: ['pending', 'signed', 'rejected'], default: 'pending' }
});

module.exports = mongoose.model('Signature', signatureSchema);
