const express = require('express');
const router = express.Router();
const { enhanceNote } = require('../../controllers/aiController');
const validateTokenHandler = require('../../middleware/validateTokenHandler');

// protected routes
router.use(validateTokenHandler);

// AI enhance note
router.post('/enhance', enhanceNote);  

module.exports = router;