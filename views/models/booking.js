const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    BookingId: Number,
    BookingDate: String,
    BookingNo: Date,
    TravelerCount: Date,
    CustomerId: Number,
    TripTypeId: Number,
    PackageId: Number,
  });
  const Booking = new mongoose.model("Booking", bookingSchema);

  module.exports = Booking;