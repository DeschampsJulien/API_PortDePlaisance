const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const { authMiddleware } = require('../middleware/auth');

// Dashboard
router.get('/', authMiddleware, async (req, res) => {
  const catways = await Catway.find();
  const reservations = await Reservation.find().sort({ checkIn: 1 });
  res.render('dashboard', { user: req.user, catways, reservations });
});

module.exports = router;
