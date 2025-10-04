const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

// Page login
router.get("/login", (req, res) => res.render("login", { error: null }));

// Connexion
router.post("/login", loginUser);

// Déconnexion
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
});

// Création utilisateur (POST via Postman)
// router.post("/register", createUser);

module.exports = router;
