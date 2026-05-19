const express = require('express');

const Booking = require('../models/Booking');
const { requireAdmin } = require('../middleware/auth');
const { generateBookingQR } = require('../utils/qr');

const router = express.Router();

router.use(requireAdmin);

router.get('/bookings', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

router.get('/bookings/:id', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.patch('/bookings/:id/approve', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    if (booking.status === 'approved') return res.json(booking);

    const conflict = await Booking.findOne({
      _id: { $ne: booking._id },
      status: 'approved',
      checkIn: { $lt: booking.checkOut },
      checkOut: { $gt: booking.checkIn },
    });
    if (conflict) {
      return res
        .status(409)
        .json({ error: 'Dates overlap an already approved booking' });
    }

    booking.status = 'approved';
    booking.qrCode = await generateBookingQR(booking);
    await booking.save();
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.patch('/bookings/:id/reject', async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    booking.status = 'rejected';
    booking.qrCode = undefined;
    await booking.save();
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

router.post('/bookings/:id/verify-qr', async (req, res, next) => {
  try {
    const { bookingId } = req.body || {};
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    const valid =
      booking.status === 'approved' && bookingId === booking._id.toString();
    res.json({ valid, booking });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
