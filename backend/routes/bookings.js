const express = require('express');

const Booking = require('../models/Booking');
const { upload, uploadBufferToCloudinary } = require('../middleware/upload');
const { isValidRange } = require('../utils/dates');

const router = express.Router();

router.post('/', upload.single('paymentImage'), async (req, res, next) => {
  try {
    const {
      name,
      phone,
      church,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      rulesAccepted,
    } = req.body;

    if (!name || !phone || !checkIn || !checkOut || !guests || !totalPrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!isValidRange(checkIn, checkOut)) {
      return res.status(400).json({ error: 'Invalid date range' });
    }
    if (String(rulesAccepted) !== 'true') {
      return res.status(400).json({ error: 'You must accept the rules' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Payment screenshot is required' });
    }

    const conflict = await Booking.findOne({
      status: { $in: ['approved'] },
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) },
    });
    if (conflict) {
      return res
        .status(409)
        .json({ error: 'Selected dates overlap an existing booking' });
    }

    const total = Number(totalPrice);
    const deposit = Math.round(total * 0.25);

    const uploaded = await uploadBufferToCloudinary(req.file.buffer);

    const booking = await Booking.create({
      name,
      phone,
      church,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: Number(guests),
      totalPrice: total,
      deposit,
      paymentImage: uploaded.secure_url,
      status: 'pending',
      rulesAccepted: true,
    });

    res.status(201).json({
      id: booking._id,
      status: booking.status,
      deposit: booking.deposit,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).select(
      'name phone church checkIn checkOut guests totalPrice deposit status qrCode createdAt'
    );
    if (!booking) return res.status(404).json({ error: 'Not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
