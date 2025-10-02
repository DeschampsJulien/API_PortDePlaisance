const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const catwayController = require("../controllers/catwayController");
const reservationController = require("../controllers/reservationController");

// Page accueil
router.get("/", (req, res) => {
  res.render("home");
});

// CRUD Utilisateurs
router.get("/users", userController.getAllUsers);
router.post("/users", userController.createUser);
router.post("/users/:id/update", userController.updateUser);
router.post("/users/:id/delete", userController.deleteUser);

// CRUD Catways
router.get("/catways", catwayController.getAllCatways);
router.post("/catways", catwayController.createCatway);
router.post("/catways/:id/update", catwayController.updateCatway);
router.post("/catways/:id/delete", catwayController.deleteCatway);

// crud Réservations
router.get("/reservations", reservationController.getAllReservations);
router.post("/reservations", reservationController.createReservation);
router.post("/reservations/:id/update", reservationController.updateReservation);
router.post("/reservations/:id/delete", reservationController.deleteReservation);

module.exports = router;
