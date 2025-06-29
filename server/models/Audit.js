const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  timestamp: { type: Date, default: Date.now },
  ip: String
});

module.exports = mongoose.model('Audit', auditSchema);
