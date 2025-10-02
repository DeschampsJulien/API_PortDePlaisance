const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

// Page d'accueil du dashboard
router.get("/", isAuth, isAdmin, dashboardController.home);

// Gestion utilisateurs
router.get("/users", isAuth, isAdmin, dashboardController.listUsers);
router.post("/users/create", isAuth, isAdmin, dashboardController.createUser);
router.post("/users/update", isAuth, isAdmin, dashboardController.updateUser);
router.post("/users/delete", isAuth, isAdmin, dashboardController.deleteUser);

// Gestion catways
router.get("/catways", isAuth, isAdmin, dashboardController.listCatways);
router.post("/catways/create", isAuth, isAdmin, dashboardController.createCatway);
router.post("/catways/update", isAuth, isAdmin, dashboardController.updateCatway);
router.post("/catways/delete", isAuth, isAdmin, dashboardController.deleteCatway);

// Gestion réservations
router.get("/reservations", isAuth, isAdmin, dashboardController.listReservations);

module.exports = router;
