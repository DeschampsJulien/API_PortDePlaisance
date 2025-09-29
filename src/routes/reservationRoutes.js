const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const reservationController = require("../controllers/reservationController");

// Sous-routes réservations liées aux catways
router.get("/", verifyToken, reservationController.getAllReservations);
router.get("/:idReservation", verifyToken, reservationController.getReservationById);
router.post("/", verifyToken, reservationController.createReservation);
router.delete("/:idReservation", verifyToken, reservationController.deleteReservation);

module.exports = router;
