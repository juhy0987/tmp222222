const express = require('express');
const { registerValidator } = require('../validators/authValidator');
const authController = require('../controllers/authController');

const router = express.Router();

// POST /api/register/
router.post('/', registerValidator, authController.register);

module.exports = router;