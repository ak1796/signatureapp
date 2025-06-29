const Signature = require('../models/Signature');

exports.saveSignature = async (req, res) => {
  const { documentId, x, y, page } = req.body;
  const signature = await Signature.create({
    documentId,
    userId: req.user.id,
    x, y, page,
    status: 'signed'
  });
  res.json(signature);
};

exports.getSignatures = async (req, res) => {
  const docId = req.params.id;
  const sigs = await Signature.find({ documentId: docId });
  res.json(sigs);
};

exports.finalize = async (req, res) => {
  // Placeholder: Use pdf-lib to write signature into PDF
  res.json({ message: 'PDF finalized (stub)' });
};
