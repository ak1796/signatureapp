const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveSignature, getSignatures, finalize } = require('../controllers/signatureController');

router.post('/', auth, saveSignature);
router.get('/:id', auth, getSignatures);
router.post('/finalize', auth, finalize);

module.exports = router;
