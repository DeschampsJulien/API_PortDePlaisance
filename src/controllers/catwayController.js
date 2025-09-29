const Catway = require("../models/Catway");

// Lister tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("dashboard", { catways, users: [], reservations: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// Afficher les détails d’un catway
exports.getCatwayDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const catway = await Catway.findById(id);
    if (!catway) {
      return res.status(404).send("Catway introuvable");
    }
    res.render("catwayDetails", { catway });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// Créer un catway
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, type, catwayState } = req.body;

    const newCatway = new Catway({
      catwayNumber,
      type,
      catwayState,
    });

    await newCatway.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création du catway");
  }
};

// Modifier l’état d’un catway
exports.updateCatwayState = async (req, res) => {
  try {
    const { id } = req.params;
    const { catwayState } = req.body;

    const updatedCatway = await Catway.findByIdAndUpdate(
      id,
      { catwayState },
      { new: true }
    );

    if (!updatedCatway) {
      return res.status(404).send("Catway introuvable");
    }

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour du catway");
  }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    const { id } = req.params;
    await Catway.findByIdAndDelete(id);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression du catway");
  }
};
