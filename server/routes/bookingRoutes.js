const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const bookingModel = require("../models/bookingModel");
const showModel = require("../models/showModel");
 
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { showId, seats, userId, amount } = req.body;
 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Movie Ticket Booking",
              description: `${seats.length} seat(s): ${seats.join(", ")}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/book-show/${showId}?seats=${seats.join(",")}&userId=${userId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/`,
    });
 
    res.send({
      success: true,
      message: "Checkout session created",
      url: session.url,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
 
router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const { show, transactionId, seats, user } = req.body;
 
    const newBooking = new bookingModel({ show, transactionId, seats, user });
    await newBooking.save();
 
    const showData = await showModel.findById(show).populate("movie");
    const updatedBookedSeats = [...showData.bookedSeats, ...seats];
    showData.bookedSeats = updatedBookedSeats;
    await showData.save();
 
    res.send({
      success: true,
      message: "Show booked successfully",
      data: newBooking,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
 
router.get("/all-booking-by-user", authMiddleware, async (req, res) => {
  try {
    const bookings = await bookingModel.find({ user: req.body.userId });
    res.send({
      success: true,
      message: "All bookings have been fetched",
      data: bookings,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
 
module.exports = router;