const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const catwayController = require("../controllers/catwayController");

// Lister tous les catways
router.get("/", verifyToken, catwayController.getAllCatways);

// Afficher les détails d’un catway (via query ?id=123 ou form POST)
router.get("/details/:id", verifyToken, catwayController.getCatwayDetails);

// Créer un catway
router.post("/", verifyToken, catwayController.createCatway);

// Modifier la description de l’état d’un catway
router.post("/update/:id", verifyToken, catwayController.updateCatwayState);

// Supprimer un catway
router.post("/delete/:id", verifyToken, catwayController.deleteCatway);

module.exports = router;

