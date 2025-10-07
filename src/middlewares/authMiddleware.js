const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/auth/login");
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.redirect("/auth/login");
    }

    req.user = user; // stocke l’utilisateur connecté
    next();
  } catch (err) {
    console.error(err);
    res.redirect("/auth/login");
  }
};



