const Stripe=require("stripe");
const stripe=Stripe(process.env.STRIPE_KEY);
const router=require("express").Router();
const authMiddleware=require("../middlewares/authMiddleware");
const movieModel = require("../models/movieModel");


router.post("/book-show",authMiddleware,async(req,res)=>{
    try{
    const newBooking =await bookingModel(req.body);
    await newBooking.save();

    const show=await showModel.findById(req.body.show).populate("movie");
    const updatedBookedSeats=[...show.bookedSeats,...req.body.seats];
    show.bookedSeats=updatedBookedSeats;
    await show.save();
    res.send({
        success:true,
        message:"Show booked successfully",
        data:newBooking
    })


    }catch(err){
     res.send({
        success:false,
        message:err.message,
     })
   }
});
router.get("/all-booking-by-user",authMiddleware, async(req,res)=>{
    try{
    const bookings=await bookingModel.find({user:req.body.userId});
    res.send({
        success:true,
        message:"All bookings have been fetched",
        data:bookings,
    })
    } 
    catch(err){
     res.send({
        success:false,
        message:err.message,
     })
   }
})




module.exports=router;
