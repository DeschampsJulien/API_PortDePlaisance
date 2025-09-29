const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
require('dotenv').config();

const importData = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const catways = JSON.parse(fs.readFileSync(path.join(__dirname, '../catways.json')));
  const reservations = JSON.parse(fs.readFileSync(path.join(__dirname, '../reservations.json')));

  await Catway.deleteMany();
  await Reservation.deleteMany();

  await Catway.insertMany(catways);
  await Reservation.insertMany(reservations);

  console.log('Données importées ✅');
  process.exit();
};

importData();
