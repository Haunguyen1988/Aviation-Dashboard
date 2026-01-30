const express = require('express');
const router = express.Router();

router.get('/sectors-trend', (req, res) => res.json({ message: "Sector trend data" }));
router.get('/layover-trend', (req, res) => res.json({ message: "Layover trend data" }));
router.get('/deadhead-trend', (req, res) => res.json({ message: "Deadhead trend data" }));
router.get('/ac-change-trend', (req, res) => res.json({ message: "AC change trend data" }));

module.exports = router;
