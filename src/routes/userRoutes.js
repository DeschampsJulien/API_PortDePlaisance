const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { getAllUsers, createUser, updateUser, deleteUser } = require("../controllers/userController");


// Affichage de tous les utilisateur (admin, user)
router.get("/home/users", verifyToken, getAllUsers);

// Création d’un utilisateur depuis le dashboard
router.post("/home/users", verifyToken, createUser);

// Modifier un utilisateur depuis le dashboard
router.post("/home/users/:id/update", verifyToken, updateUser);

// Supprimer un utilisateur depuis le dashboard
router.post("/home/users/:id/delete", verifyToken, deleteUser);

module.exports = router;
