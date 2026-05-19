require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

async function run() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set');
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await User.hashPassword(password);
  await User.create({ username, passwordHash, role: 'admin' });
  console.log(`Admin "${username}" created`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
