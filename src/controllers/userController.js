const User = require("../models/userModel");

// Récupérer tous les utilisateurs (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.render("dashboard/users", {
      user: req.user,    // utilisateur connecté
      users: users,     
      error: null
    });
  } catch (err) {
    console.error(err);
    res.render("dashboard/users", {
      user: req.user,
      users: [],         // au pire une liste vide
      error: "Impossible de charger les utilisateurs"
    });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Utilisateur introuvable");
    res.json(user);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// créer un utilisateur (admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      const users = await User.find();
      return res.render("dashboard/users", {
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
    res.render("dashboard/users", {
      user: req.user,
      users,
      error: null,
    });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard/users", {
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
    res.render("dashboard/users", { user: req.user, users, error: null });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard/users", { user: req.user, users, error: "Erreur lors de la mise à jour de l’utilisateur." });
  }
};

// Supprimer un utilisateur (admin)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    // Recharge la liste des utilisateurs
    const users = await User.find();
    res.render("dashboard/users", { user: req.user, users, error: null });
  } catch (err) {
    console.error(err);
    const users = await User.find();
    res.render("dashboard/users", { user: req.user, users, error: "Erreur lors de la suppression de l’utilisateur." });
  }
};

