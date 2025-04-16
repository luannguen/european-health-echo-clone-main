const express = require('express');
const dbTestController = require('./db-test.controller');
const { adminAuth } = require('../../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/admin/db-test
 * @desc    Test database connection
 * @access  Admin
 */
router.get('/', adminAuth, dbTestController.testConnection);

module.exports = router;