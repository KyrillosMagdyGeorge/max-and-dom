const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    church: { type: String, trim: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    deposit: { type: Number, required: true, min: 0 },
    paymentImage: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    qrCode: { type: String },
    rulesAccepted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

BookingSchema.index({ checkIn: 1, checkOut: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
