const Reservation = require("../models/reservationModel");
const Catway = require("../models/catwayModel");

// Affiche la liste des catways pour réserver
exports.getCatwaysForReservation = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("dashboard/reservations", { catways, error: null });
  } catch (err) {
    console.error("Erreur showCatwaysForReservation:", err);
    res.render("dashboard/reservations", { catways: [], error: "Erreur lors du chargement des catways." });
  }
};

// Affiche les réservations pour un catway
exports.getReservationsByCatway = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) {
      return res.render("home/catwayReservations", { catway: null, reservations: [], error: "Catway introuvable." });
    }
    const reservations = await Reservation.find({ catwayNumber: catway._id });
    res.render("dashboard/catwayReservations", { catway, reservations, error: null });
  } catch (err) {
    res.render("dashboard/catwayReservations", { catway: null, reservations: [], error: "Erreur lors du chargement." });
  }
};

// Créer une réservation
exports.createReservation = async (req, res) => {
  try {
    const { clientName, boatName, checkIn, checkOut } = req.body;
    const catwayId = req.params.id;

    const catway = await Catway.findById(catwayId);
    if (!catway) {
      return res.render("dashboard/reservations", {
        catway: null,
        reservations: [],
        error: "Catway introuvable."
      });
    }

    // Vérifier chevauchement des dates pour CE catway
    const overlapping = await Reservation.findOne({
      catway: catway._id,
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }
      ]
    });

    if (overlapping) {
      const reservations = await Reservation.find({ catway: catway._id });
      return res.render("dashboard/reservations", {
        catway,
        reservations,
        error: "Ce catway est déjà réservé sur cette période."
      });
    }

    // Création
    await Reservation.create({
      catwayNumber: catway._id,
      clientName,
      boatName,
      checkIn,
      checkOut
    });

    res.redirect(`/dashboard/catways/${catwayId}/reservations`);
  } catch (err) {
    res.render("dashboard/reservations", {
      catway: null,
      reservations: [],
      error: "Erreur lors de la création."
    });
  }
};

// DELETE /dashboard/catways/:id/reservations/:idReservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    await Reservation.findOneAndDelete({ _id: idReservation, catwayNumber: id });

    res.redirect(`/dashboard/catways/${id}/reservations`);
  } catch (err) {
    res.render("dashboard/reservations", {
      catway: null,
      reservations: [],
      error: "Erreur lors de la suppression."
    });
  }
};

