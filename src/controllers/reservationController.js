const Reservation = require("../models/Reservation");

// Lister toutes les réservations
exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.render("reservations", { reservations, user: req.user });
};

// Détails d’une réservation
exports.getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  res.render("reservationDetails", { reservation, user: req.user });
};

// Créer une réservation (vérifie chevauchement)
exports.createReservation = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

    // Vérification chevauchement
    const overlap = await Reservation.findOne({
      catwayNumber,
      $or: [
        { checkIn: { $lte: new Date(checkOut), $gte: new Date(checkIn) } },
        { checkOut: { $gte: new Date(checkIn), $lte: new Date(checkOut) } },
        {
          checkIn: { $lte: new Date(checkIn) },
          checkOut: { $gte: new Date(checkOut) },
        },
      ],
    });

    if (overlap) {
      return res.status(400).send("Ce catway est déjà réservé pendant cette période");
    }

    const reservation = new Reservation({ catwayNumber, clientName, boatName, checkIn, checkOut });
    await reservation.save();
    res.redirect("/reservations");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.idReservation);
  res.redirect("/reservations");
};
