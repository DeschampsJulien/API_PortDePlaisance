const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
// const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(methodOverride("_method"));

// EJS config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
// app.use("/home/reservations", reservationRoutes);

// Page d'accueil → redirection vers login
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Connexion à MongoDB et lancement du serveur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connecté !");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Application dispo sur http://localhost:${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

