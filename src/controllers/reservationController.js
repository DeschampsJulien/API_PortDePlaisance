const Reservation = require("../models/reservationModel");
const Catway = require("../models/catwayModel");

// Liste toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("home/reservations", { reservations, error: null });
  } catch (err) {
    console.error(err);
    res.render("home/reservations", { reservations: [], error: "Erreur lors du chargement des réservations." });
  }
};

// Créer une réservation avec validation
exports.createReservation = async (req, res) => {
  const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

  try {
    // Vérifier que les dates sont valides
    if (new Date(checkOut) < new Date(checkIn)) {
      const reservations = await Reservation.find();
      return res.render("home/reservations", { reservations, error: "La date de fin doit être après la date de début." });
    }

    // Vérifier que le catway existe
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
      const reservations = await Reservation.find();
      return res.render("home/reservations", { reservations, error: "Le catway n'existe pas." });
    }

    // Vérifier les conflits de réservation pour le même catway
    const conflict = await Reservation.findOne({
      catwayNumber,
      $or: [
        { checkIn: { $lte: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $lte: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } }
      ]
    });

    if (conflict) {
      const reservations = await Reservation.find();
      return res.render("home/reservations", { reservations, error: "Ce catway est déjà réservé à ces dates." });
    }

    await Reservation.create({ catwayNumber, clientName, boatName, checkIn, checkOut });
    res.redirect("/home/reservations");
  } catch (err) {
    console.error(err);
    const reservations = await Reservation.find();
    res.render("home/reservations", { reservations, error: "Erreur lors de la création de la réservation." });
  }
};

// Supprimer réservation
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect("/home/reservations");
  } catch (err) {
    console.error(err);
    const reservations = await Reservation.find();
    res.render("home/reservations", { reservations, error: "Erreur lors de la suppression de la réservation." });
  }
};

// Modifier réservation (seules les dates et noms peuvent être modifiés ici)
exports.updateReservation = async (req, res) => {
  const { clientName, boatName, checkIn, checkOut } = req.body;
  try {
    if (new Date(checkOut) < new Date(checkIn)) {
      const reservations = await Reservation.find();
      return res.render("home/reservations", { reservations, error: "La date de fin doit être après la date de début." });
    }

    await Reservation.findByIdAndUpdate(req.params.id, { clientName, boatName, checkIn, checkOut });
    res.redirect("/home/reservations");
  } catch (err) {
    console.error(err);
    const reservations = await Reservation.find();
    res.render("home/reservations", { reservations, error: "Erreur lors de la mise à jour de la réservation." });
  }
};
