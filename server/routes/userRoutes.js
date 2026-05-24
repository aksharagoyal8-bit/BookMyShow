const router=require("express").Router();
const {createuser, readuser, getCurrentUser} = require("../controllers/usercontroller");
const authMiddleware=require("../middlewares/authMiddleware");
const userModel=require("../models/usermodels")

router.post('/register',createuser);
router.post("/login",readuser)

router.get("/get-current-user",authMiddleware,getCurrentUser);


module.exports=router;