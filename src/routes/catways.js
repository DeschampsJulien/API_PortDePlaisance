const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET tous
router.get('/', authMiddleware, async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

// GET un
router.get('/:id', authMiddleware, async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).json({ error: 'Non trouvé' });
  res.json(catway);
});

// POST
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const catway = await Catway.create(req.body);
  res.status(201).json(catway);
});

// PUT
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(catway);
});

// PATCH
router.patch('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(catway);
});

// DELETE
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);
  res.json({ message: 'Catway supprimé' });
});

module.exports = router;
