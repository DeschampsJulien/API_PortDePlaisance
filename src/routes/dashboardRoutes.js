const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/authController");


// Affichage de tous les utilisateur (admin, user)
router.get("/", verifyToken, getAllUsers);

// Création d’un utilisateur depuis le dashboard
router.post("/users", verifyToken, createUser);

// Modifier un utilisateur depuis le dashboard
router.post("/users/:id/update", verifyToken, updateUser);

// Supprimer un utilisateur depuis le dashboard
router.post("/users/:id/delete", verifyToken, deleteUser);

module.exports = router;
