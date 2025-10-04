const Catway = require("../models/catwayModel");

// Lister tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    return res.render("dashboard/catways", { catways, error: null });
  } catch (err) {
    return res.render("dashboard/catways", { catways: [], error: "Impossible de charger les catways." });
  }
};

// Récupérer un catway par ID
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send("Catway introuvable");
    res.json(catway);
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};

// Créer un catway
exports.createCatway = async (req, res) => {
  const { catwayNumber, type, catwayState } = req.body;
  try {
    const existingCatway = await Catway.findOne({ catwayNumber });
    if (existingCatway) {
      const catways = await Catway.find();
      return res.render("dashboard/catways", { catways, error: "Ce catway existe déjà." });
    }

    await Catway.create({ catwayNumber, type, catwayState });
    return res.redirect("/dashboard/catways");
  } catch (err) {
    const catways = await Catway.find();
    return res.render("dashboard/catways", { catways, error: "Erreur lors de la création du catway." });
  }
};

// Modifier uniquement l'état d’un catway
exports.updateCatway = async (req, res) => {
  const { id } = req.params;
  const { catwayState } = req.body;

  try {
    const updated = await Catway.findByIdAndUpdate(
      id,
      { catwayState }, // ✅ On ne met à jour que l’état
      { new: true }
    );

    if (!updated) {
      const catways = await Catway.find();
      return res.render("dashboard/catways", { catways, error: "Catway introuvable." });
    }

    return res.redirect("/dashboard/catways");
  } catch (err) {
    const catways = await Catway.find();
    return res.render("dashboard/catways", { catways, error: "Erreur lors de la modification de l’état du catway." });
  }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Catway.findByIdAndDelete(id);

    if (!deleted) {
      const catways = await Catway.find();
      return res.render("dashboard/catways", { catways, error: "Catway introuvable." });
    }

    return res.redirect("/dashboard/catways");
  } catch (err) {
    const catways = await Catway.find();
    return res.render("dashboard/catways", { catways, error: "Erreur lors de la suppression du catway." });
  }
};
