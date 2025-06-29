const Document = require('../models/Document');

exports.upload = async (req, res) => {
  try {
    const doc = await Document.create({
      userId: req.user.id,
      filename: req.file.originalname,
      path: req.file.path
    });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  const docs = await Document.find({ userId: req.user.id });
  res.json(docs);
};

exports.getById = async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
};
