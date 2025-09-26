const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET toutes (pour dashboard)
router.get('/', authMiddleware, async (req, res) => {
  const reservations = await Reservation.find().sort({ checkIn: 1 });
  res.json(reservations);
});

// POST créer une réservation (empêche chevauchements)
router.post('/:catwayNumber', authMiddleware, async (req, res) => {
  const { catwayNumber } = req.params;
  const { clientName, boatName, checkIn, checkOut } = req.body;

  const conflict = await Reservation.findOne({
    catwayNumber,
    $or: [{ checkIn: { $lte: new Date(checkOut) }, checkOut: { $gte: new Date(checkIn) } }]
  });
  if (conflict) return res.status(400).json({ error: 'Catway déjà réservé sur cette période' });

  const reservation = await Reservation.create({ catwayNumber, clientName, boatName, checkIn, checkOut });
  res.status(201).json(reservation);
});

// DELETE une réservation
router.delete('/:catwayNumber/:idReservation', authMiddleware, adminMiddleware, async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.idReservation);
  res.json({ message: 'Réservation supprimée' });
});

module.exports = router;
