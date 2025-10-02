const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const catwayController = require("../controllers/catwayController");

// Lister tous les catways depuis le dashboard
router.get("/home/catways", verifyToken, catwayController.getAllCatways);

// Créer un catway depuis le dashboard
router.post("/home/catways", verifyToken, catwayController.createCatway);

// Modifier un catway depuis le dashboard
router.post("/home/catways/:id/update", verifyToken, catwayController.updateCatway);

// Supprimer un catway depuis le dashboard
router.post("/home/catways/:id/delete", verifyToken, catwayController.deleteCatway);

module.exports = router;
