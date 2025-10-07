require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', UserSchema);

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://PortDePlaisance:Guaganco34.@portdeplaisancecluster.gjnwjcl.mongodb.net/?retryWrites=true&w=majority&appName=PortDePlaisanceCluster";

async function createAdmin() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connecté");

    const email = "julien@marina.fr";
    const plainPassword = "Julien123";

    // Supprimer les anciens utilisateurs
    await User.deleteMany({ email });
    console.log("🗑️ Utilisateurs existants supprimés");

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Création du nouvel utilisateur
    const newUser = await User.create({
      name: "Julien",
      email,
      password: hashedPassword,
      role: "admin"
    });
    console.log("✅ Nouvel admin créé :", newUser);

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(plainPassword, newUser.password);
    console.log("🔑 Vérification du mot de passe :", isMatch ? "OK" : "Échec");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

createAdmin();
