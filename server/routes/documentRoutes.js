const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { upload: uploadDoc, getAll, getById } = require('../controllers/documentController');

router.post('/upload', auth, upload.single('pdf'), uploadDoc);
router.get('/', auth, getAll);
router.get('/:id', auth, getById);

module.exports = router;
