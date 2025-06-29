const Audit = require('../models/Audit');

exports.getAuditLogs = async (req, res) => {
  const logs = await Audit.find({ documentId: req.params.docId });
  res.json(logs);
};
