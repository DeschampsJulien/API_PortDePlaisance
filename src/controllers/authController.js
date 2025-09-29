const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Connexion utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("login", { error: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login", { error: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Erreur serveur" });
  }
};


// Récupérer tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.render("dashboard", {
      user: req.user,    // utilisateur connecté
      users: users,     
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render("dashboard", {
      user: req.user,
      users: [],         // au pire une liste vide
      error: "Impossible de charger les utilisateurs"
    });
  }
};


// créer un utilisateur (admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      const users = await User.find();
      return res.render("dashboard", {
        user: req.user,
        users,
        error: "Un utilisateur avec cet email existe déjà.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    const users = await User.find();
    res.render("dashboard", {
      user: req.user,
      users,
      error: null,
    });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard", {
      user: req.user,
      users,
      error: "Erreur lors de la création de l’utilisateur.",
    });
  }
};

// Modifier un utilisateur (admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const updateData = { name, email, role };

    // si un nouveau mot de passe est fourni, on le hash
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(id, updateData, { new: true });

    // recharge la liste des utilisateurs pour le dashboard
    const users = await User.find();
    res.render("dashboard", { user: req.user, users, error: null });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard", { user: req.user, users, error: "Erreur lors de la mise à jour de l’utilisateur." });
  }
};


// Supprimer un utilisateur (admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    // Recharge la liste des utilisateurs
    const users = await User.find();
    res.render("dashboard", { user: req.user, users, error: null });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard", { user: req.user, users, error: "Erreur lors de la suppression de l’utilisateur." });
  }
};

