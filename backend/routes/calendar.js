const express = require('express');

const Booking = require('../models/Booking');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const bookings = await Booking.find({
      status: { $in: ['pending', 'approved'] },
    }).select('checkIn checkOut status name');

    const events = bookings.map((b) => ({
      id: b._id.toString(),
      title: b.status === 'approved' ? 'Booked' : 'Pending',
      start: b.checkIn,
      end: b.checkOut,
      status: b.status,
      color:
        b.status === 'approved'
          ? '#b91c1c'
          : b.status === 'pending'
          ? '#ca8a04'
          : '#15803d',
      display: 'block',
    }));

    res.json(events);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
