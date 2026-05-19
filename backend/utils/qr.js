const QRCode = require('qrcode');

async function generateBookingQR(booking) {
  const payload = JSON.stringify({
    bookingId: booking._id.toString(),
    name: booking.name,
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
  });
  return QRCode.toDataURL(payload, { width: 400, margin: 2 });
}

module.exports = { generateBookingQR };
