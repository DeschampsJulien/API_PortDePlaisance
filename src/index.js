const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/catways", catwayRoutes);
app.use("/reservations", reservationRoutes);

// Page d'accueil → redirection vers login
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Connexion à MongoDB et démarrage du serveur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté !");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`Application disponible sur http://localhost:${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => console.error("Erreur MongoDB:", err));
