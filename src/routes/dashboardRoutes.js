const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

const { verifyToken } = require("../middlewares/authMiddleware");

// Page accueil
router.get("/", (req, res) => {
  res.render("dashboard");
});

// Utilisateurs
router.get("/users",verifyToken, userController.getAllUsers);
router.get("/users/:id",verifyToken, userController.getUserById);
router.post("/users",verifyToken, userController.createUser);
router.put("/users/:id/update",verifyToken, userController.updateUser);
router.delete("/users/:id/delete",verifyToken, userController.deleteUser);

// Catways
router.get("/catways",verifyToken, catwayController.getAllCatways);
router.get("/catways/:id",verifyToken, catwayController.getCatwayById);
router.post("/catways",verifyToken, catwayController.createCatway);
router.put("/catways/:id/update",verifyToken, catwayController.updateCatway);
router.delete("/catways/:id/delete",verifyToken, catwayController.deleteCatway);

// Réservations et liste liées au catway
router.get("/reservations",verifyToken, reservationController.getCatwaysForReservation);
router.get("/catways/:id/reservations",verifyToken, reservationController.getReservationsByCatway);
router.post("/catways/:id/reservations",verifyToken, reservationController.createReservation);
router.delete("/catways/:id/reservations/:idReservation/delete",verifyToken, reservationController.deleteReservation);

module.exports = router;
