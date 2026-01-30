const express = require('express');
const router = express.Router();
const aimsController = require('../controllers/aimsController');
const auth = require('../middleware/auth');

router.post('/sync-roster', auth.authenticate, aimsController.syncRoster);
router.post('/sync-flights', auth.authenticate, aimsController.syncFlights);

module.exports = router;
