const express = require('express');
const router = express.Router();
const kpiController = require('../controllers/kpiController');
const { authenticate } = require('../middleware/auth');

router.get('/sectors', authenticate, kpiController.getSectorCount);
router.get('/ac-changes', authenticate, kpiController.getACChanges);
router.get('/block-hours', authenticate, kpiController.getBlockHours);
router.get('/layovers', authenticate, kpiController.getLayovers);
router.get('/deadheads', authenticate, kpiController.getDeadheads);

module.exports = router;
